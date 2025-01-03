const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Company = require("../models/Company");
const Event = require("../models/Events");
const Groq = require('groq-sdk')
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.post("/signup", authController.signup_post);
router.get("/signup", authController.signup_get);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.post("/logout", authController.logout_get);
router.get("/profile", authController.profile_get);

router.post("/internshipData", authController.internshipData_post);
router.get("/internshipData/:batch", authController.internshipData_get);

router.get("/tnpData/:batch", authController.tnpData_get);

// router.post("/resumeScore", authController.resumeScore_post);

const uploadDir = "./upload";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Temporary save with the original name
  },
});

const upload1= multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// File upload route
router.post("/tnpData", upload1.single("file"), async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    // Use custom name if provided, otherwise use the original file name
    const customName = path.parse(file.originalname).name;
    const ext = path.extname(file.originalname); // Extract original extension

    const newFilePath = path.join(uploadDir, `${customName}${ext}`);

    // Rename the file with the custom name
    fs.renameSync(file.path, newFilePath);
    const { batch, companyName, questions } = req.body;
    const companyData = await Company.create({
      batch,
      companyName,
      jd: newFilePath,
      questions,
    });
    res.status(200).send({
      message: "File uploaded and saved with custom name successfully!",
      data: companyData
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send({
      message: "Error uploading file",
    });
  }
});

// File upload route
router.post("/eventData", upload1.single("file"), async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    // Use custom name if provided, otherwise use the original file name
    const customName = path.parse(file.originalname).name;
    const ext = path.extname(file.originalname); // Extract original extension

    const newFilePath = path.join(uploadDir, `${customName}${ext}`);

    // Rename the file with the custom name
    fs.renameSync(file.path, newFilePath);

    const data = await Event.create({ images: newFilePath });
    res.status(200).send({
      message: "File uploaded and saved with custom name successfully!",
      data,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send({
      message: "Error uploading file",
    });
  }
});



const upload = multer({
  storage: multer.memoryStorage(), 
});

let base64Image = "";



const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/resumeScore", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send({ error: "No image uploaded" });
  }

  try {
    const base64Image = file.buffer.toString("base64");
    console.log(`File received: ${file.originalname}`);
    console.log(`Base64 Image: ${base64Image.slice(0, 50)}...`);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              "type": "text",
              "text": "Please review the attached resume and score it on formatting,  improvements. Highlight any strengths or unique aspects of the resume. and provide in correct format to render this feedback "
            },            
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Image}` },
            },
          ],
        },
      ],
      model: "llama-3.2-11b-vision-preview",
    });
    const resp = chatCompletion.choices?.[0]?.message?.content;
    if (!resp) return res.send("No content returned");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `convert this response into a valid json object using {}   if there is no score (give your own score based on feedback/100) and if there is  no feedback use null ${JSON.stringify(resp)}`;
  const geminiresp = await model.generateContent(prompt);

  if (!geminiresp) return "No content returned";
  
  // Extract the response content or return fallback message
  return res.send(geminiresp?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No content returned");

    
  } catch (error) {
    console.error("Error:", error.message || error);
    return res.status(500).send({ error: "Error analyzing the image" });
  }
});
module.exports = router;

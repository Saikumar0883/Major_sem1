"use client"
import React,{useState} from 'react';
import { ReactFlow } from '@xyflow/react';
import Modal from 'react-modal'; // Importing the Modal component
import '@xyflow/react/dist/style.css';
import { resources } from './data';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import { CircleArrowOutUpRight } from 'lucide-react';

const initialNodes = [
  { id: '1', position: { x: 690, y: 0 }, data: { label: 'Blockchain Technology' } },

  // Blockchain Platforms
  { id: '2', position: { x: 190, y: 100 }, data: { label: 'Blockchain Platforms' }, style: { backgroundColor: '#ffcccb' } },
  { id: '3', position: { x: 190, y: 200 }, data: { label: 'Ethereum' }, style: { backgroundColor: '#add8e6' } },
  { id: '4', position: { x: 0, y: 200 }, data: { label: 'Hyperledger' }, style: { backgroundColor: '#add8e6' } },
  { id: '5', position: { x: 380, y: 200 }, data: { label: 'Polkadot' }, style: { backgroundColor: '#add8e6' } },

  // Consensus Algorithms
  { id: '6', position: { x: 690, y: 100 }, data: { label: 'Consensus Algorithms' }, style: { backgroundColor: '#ffcccb' } },
  { id: '7', position: { x: 690, y: 200 }, data: { label: 'Proof of Work (PoW)' }, style: { backgroundColor: '#add8e6' } },
  { id: '8', position: { x: 690, y: 300 }, data: { label: 'Proof of Stake (PoS)' }, style: { backgroundColor: '#add8e6' } },
  { id: '9', position: { x: 690, y: 400 }, data: { label: 'Delegated Proof of Stake (DPoS)' }, style: { backgroundColor: '#add8e6' } },
  { id: '10', position: { x: 690, y: 500 }, data: { label: 'Practical Byzantine Fault Tolerance (PBFT)' }, style: { backgroundColor: '#add8e6' } },

  // Blockchain Development Tools
  { id: '11', position: { x: 1190, y: 100 }, data: { label: 'Development Tools' }, style: { backgroundColor: '#ffcccb' } },
  { id: '12', position: { x: 1000, y: 280 }, data: { label: 'Solidity' }, style: { backgroundColor: '#add8e6' } },
  { id: '13', position: { x: 1190, y: 280 }, data: { label: 'Rust' }, style: { backgroundColor: '#add8e6' } },
  { id: '14', position: { x: 1400, y: 280 }, data: { label: 'Web3.js' }, style: { backgroundColor: '#add8e6' } },

  // Blockchain Storage
  { id: '16', position: { x: 1590, y: 100 }, data: { label: 'Blockchain Databases' }, style: { backgroundColor: '#ffcccb' } },
  { id: '17', position: { x: 1500, y: 200 }, data: { label: 'BigchainDB' }, style: { backgroundColor: '#add8e6' } },
  { id: '18', position: { x: 1700, y: 200 }, data: { label: 'MongoDB' }, style: { backgroundColor: '#add8e6' } },
];

const initialEdges = [
  // Connecting Blockchain Technology to Platforms, Consensus Algorithms, Development Tools, Storage, and Databases
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-6', source: '1', target: '6' },
  { id: 'e1-11', source: '1', target: '11' },
  { id: 'e1-16', source: '1', target: '16' },
  { id: 'e1-20', source: '1', target: '20' },

  // Blockchain Platforms connections
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },

  // Consensus Algorithms connections
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e6-8', source: '6', target: '8' },
  { id: 'e6-9', source: '6', target: '9' },
  { id: 'e6-10', source: '6', target: '10' },

  // Development Tools connections
  { id: 'e11-12', source: '11', target: '12' },
  { id: 'e11-13', source: '11', target: '13' },
  { id: 'e11-14', source: '11', target: '14' },

  // Blockchain Databsae connections
  { id: 'e16-17', source: '16', target: '17' },
  { id: 'e16-18', source: '16', target: '18' },

];







export default function AIMap() {
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const closeDialog = () => setSelectedNode(null);

  return (
    <div className="text-black w-full h-full m-2 flex items-center justify-center flex-col">
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          boxSizing: "border-box",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          fitView
          onNodeClick={onNodeClick}
        />
      </div>
      <Dialog>
      <DialogTrigger asChild>
        <button className=" m-2 p-2 rounded-lg bg-red-300 text-black">View Resource</button>
      </DialogTrigger>
      <DialogContent className="max-h-[80%]  max-w-[80%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Resouces</DialogTitle>
          <div  >
            {resources.map((resource,index)=>{
              
              return <div key={index} className='bg-sky-100 my-3 rounded-lg p-2 bg-card shadow-md text-black '>
                <h1 className='text-2xl'>{resource.title}</h1>
                <h2>{resource.intro}</h2>
                <div className='flex  items-center gap-3'>Documentation  {resource.documentationResources.map((r,i)=>{
                  return <a key={i}  className="text-blue-500 flex" href={r.url}><CircleArrowOutUpRight> {i} </CircleArrowOutUpRight></a>
                })}</div>
              </div>
            })}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>

      
    </div>
  );
}
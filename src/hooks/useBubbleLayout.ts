import { useState, useCallback, useEffect } from 'react';
import type { Memory } from '../types';

export interface BubbleNode {
  id: string;
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  memory: Memory;
}

const MIN_RADIUS = 40;
const MAX_RADIUS = 80;
const DAMPING = 0.98;
const SPRING_STRENGTH = 0.01;

export function useBubbleLayout(memories: Memory[]) {
  const [nodes, setNodes] = useState<BubbleNode[]>([]);
  const [scale, setScale] = useState(1);

  const updateLayout = useCallback((width: number, height: number) => {
    const newNodes: BubbleNode[] = memories.map(memory => ({
      id: memory.id,
      x: Math.random() * width,
      y: Math.random() * height,
      r: MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS),
      vx: 0,
      vy: 0,
      memory
    }));

    setNodes(newNodes);
  }, [memories]);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setNodes(prevNodes => {
        const updatedNodes = [...prevNodes];

        // Update velocities and positions
        for (const node of updatedNodes) {
          // Apply forces
          for (const other of updatedNodes) {
            if (node === other) continue;

            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDist = (node.r + other.r) * 1.2;

            if (distance < minDist) {
              const force = (minDist - distance) / distance;
              node.vx += dx * force * SPRING_STRENGTH;
              node.vy += dy * force * SPRING_STRENGTH;
            }
          }

          // Update position
          node.x += node.vx;
          node.y += node.vy;

          // Apply damping
          node.vx *= DAMPING;
          node.vy *= DAMPING;

          // Keep within bounds
          if (node.x < node.r) {
            node.x = node.r;
            node.vx *= -0.5;
          }
          if (node.x > window.innerWidth - node.r) {
            node.x = window.innerWidth - node.r;
            node.vx *= -0.5;
          }
          if (node.y < node.r) {
            node.y = node.r;
            node.vy *= -0.5;
          }
          if (node.y > window.innerHeight - node.r) {
            node.y = window.innerHeight - node.r;
            node.vy *= -0.5;
          }
        }

        return updatedNodes;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return {
    nodes,
    updateLayout,
    scale,
    setScale
  };
}
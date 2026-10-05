import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const DataStreamBackground = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let DPR = Math.min(window.devicePixelRatio || 1, 2);

    let mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize Constellation Data Nodes
    const nodeCount = Math.floor(Math.min(W * H / 12000, 85));
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.5 + 1.2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2,
        colorIndex: Math.floor(Math.random() * 3) // cyan, blue, purple
      });
    }

    let time = 0;

    const draw = () => {
      time += 0.015;
      ctx.clearRect(0, 0, W, H);

      // 1. Theme-aware ambient background gradient
      if (isDark) {
        const bgGrad = ctx.createLinearGradient(0, 0, W, H);
        bgGrad.addColorStop(0, '#020617');
        bgGrad.addColorStop(0.45, '#071330');
        bgGrad.addColorStop(1, '#020716');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Radiant soft nebula glows
        const glow1 = ctx.createRadialGradient(W * 0.2, H * 0.25, 10, W * 0.2, H * 0.25, W * 0.5);
        glow1.addColorStop(0, 'rgba(14, 165, 233, 0.12)');
        glow1.addColorStop(0.5, 'rgba(56, 189, 248, 0.04)');
        glow1.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow1;
        ctx.fillRect(0, 0, W, H);

        const glow2 = ctx.createRadialGradient(W * 0.8, H * 0.7, 10, W * 0.8, H * 0.7, W * 0.45);
        glow2.addColorStop(0, 'rgba(99, 102, 241, 0.10)');
        glow2.addColorStop(0.6, 'rgba(129, 140, 248, 0.02)');
        glow2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow2;
        ctx.fillRect(0, 0, W, H);
      } else {
        // Light mode luminous backdrop
        const bgGrad = ctx.createLinearGradient(0, 0, W, H);
        bgGrad.addColorStop(0, '#f8fafc');
        bgGrad.addColorStop(0.5, '#f1f5f9');
        bgGrad.addColorStop(1, '#e2e8f0');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Soft ambient azure & indigo pools
        const glow1 = ctx.createRadialGradient(W * 0.25, H * 0.2, 20, W * 0.25, H * 0.2, W * 0.45);
        glow1.addColorStop(0, 'rgba(186, 230, 253, 0.45)');
        glow1.addColorStop(0.7, 'rgba(224, 242, 254, 0.15)');
        glow1.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glow1;
        ctx.fillRect(0, 0, W, H);

        const glow2 = ctx.createRadialGradient(W * 0.8, H * 0.65, 20, W * 0.8, H * 0.65, W * 0.4);
        glow2.addColorStop(0, 'rgba(224, 231, 255, 0.40)');
        glow2.addColorStop(0.7, 'rgba(238, 242, 255, 0.15)');
        glow2.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glow2;
        ctx.fillRect(0, 0, W, H);
      }

      // 2. Continuous Fluid Data Wave Streams across bottom
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const baseHeight = H * (0.80 + w * 0.06);
        const waveSpeed = 0.008 + w * 0.004;
        const waveFreq = 0.0018 + w * 0.0006;
        const amp = 30 - w * 6;

        ctx.moveTo(0, baseHeight);
        for (let x = 0; x <= W; x += 15) {
          const y = baseHeight + Math.sin(x * waveFreq + time * waveSpeed * 60) * amp +
                                Math.cos(x * 0.003 - time * 0.4) * (amp * 0.5);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();

        if (isDark) {
          ctx.fillStyle = w === 0 ? 'rgba(14, 165, 233, 0.04)' :
                          w === 1 ? 'rgba(99, 102, 241, 0.03)' : 'rgba(56, 189, 248, 0.02)';
        } else {
          ctx.fillStyle = w === 0 ? 'rgba(14, 165, 233, 0.05)' :
                          w === 1 ? 'rgba(99, 102, 241, 0.04)' : 'rgba(186, 230, 253, 0.06)';
        }
        ctx.fill();
      }

      // 3. Update & Draw Neural Constellation Nodes & Connectors
      const maxDist = 125;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Bounce gently at viewport edges
        if (node.x < 0 || node.x > W) node.vx *= -1;
        if (node.y < 0 || node.y > H) node.vy *= -1;

        // Mouse proximity interaction (elastic deflection / attraction)
        const dxMouse = mouse.x - node.x;
        const dyMouse = mouse.y - node.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius && distMouse > 0) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          node.x -= (dxMouse / distMouse) * force * 2.2;
          node.y -= (dyMouse / distMouse) * force * 2.2;
        }

        // Draw node pulse
        const pulse = 0.75 + 0.25 * Math.sin(time * 3 + node.pulseOffset);
        const radius = node.radius * pulse;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);

        if (isDark) {
          ctx.fillStyle = node.colorIndex === 0 ? `rgba(56, 189, 248, ${0.7 * pulse})` :
                          node.colorIndex === 1 ? `rgba(96, 165, 250, ${0.7 * pulse})` :
                                                  `rgba(168, 85, 247, ${0.6 * pulse})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
        } else {
          ctx.fillStyle = node.colorIndex === 0 ? `rgba(2, 132, 199, ${0.65 * pulse})` :
                          node.colorIndex === 1 ? `rgba(79, 70, 229, ${0.65 * pulse})` :
                                                  `rgba(147, 51, 234, ${0.55 * pulse})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(2, 132, 199, 0.25)';
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw synaptic connectors between close nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = node.x - nodeB.x;
          const dy = node.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isDark ? 0.35 : 0.25);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(2, 132, 199, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();

            // Occasional glowing data packet traversing the link
            if (dist < 80 && Math.sin(time * 2 + i + j) > 0.96) {
              const t = (Math.sin(time * 3 + i) + 1) / 2;
              const px = node.x + (nodeB.x - node.x) * t;
              const py = node.y + (nodeB.y - node.y) * t;
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = isDark ? '#ffffff' : '#0284c7';
              ctx.fill();
            }
          }
        }

        // Draw connection to mouse cursor if near
        if (distMouse < mouse.radius) {
          const alpha = (1 - distMouse / mouse.radius) * (isDark ? 0.5 : 0.35);
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isDark
            ? `rgba(56, 189, 248, ${alpha})`
            : `rgba(14, 165, 233, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500"
    />
  );
};

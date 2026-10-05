import React, { useEffect, useRef } from 'react';

export const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let DPR = Math.min(window.devicePixelRatio || 1, 2);

    const stars = [];
    const numStars = 650;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2.2,
        y: (Math.random() - 0.5) * 1.45,
        z: Math.random() * 1.0 + 0.02,
        p: Math.random() * Math.PI * 2
      });
    }

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

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);

      // Deep space base gradient
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#01030d');
      bg.addColorStop(0.48, '#04112b');
      bg.addColorStop(1, '#01030a');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Layered glowing nebula
      const neb = ctx.createRadialGradient(W * 0.5, H * 0.48, 0, W * 0.5, H * 0.48, Math.max(W, H) * 0.62);
      neb.addColorStop(0, 'rgba(35, 130, 255, 0.16)');
      neb.addColorStop(0.28, 'rgba(75, 55, 220, 0.10)');
      neb.addColorStop(0.58, 'rgba(0, 190, 255, 0.045)');
      neb.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, W, H);

      // 3D perspective galaxy disk
      ctx.save();
      ctx.translate(W * 0.5, H * 0.52);
      ctx.rotate(-0.12);
      ctx.scale(1, 0.24);
      const diskRadius = Math.min(W, H) * 0.58;
      const disk = ctx.createRadialGradient(0, 0, 0, 0, 0, diskRadius);
      disk.addColorStop(0, 'rgba(220, 245, 255, 0.25)');
      disk.addColorStop(0.08, 'rgba(80, 190, 255, 0.17)');
      disk.addColorStop(0.34, 'rgba(65, 90, 255, 0.09)');
      disk.addColorStop(0.72, 'rgba(45, 30, 180, 0.025)');
      disk.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = disk;
      ctx.beginPath();
      ctx.arc(0, 0, diskRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Warp perspective stars moving towards the camera
      const cx = W * 0.5;
      const cy = H * 0.52;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.z -= 0.00024;
        if (s.z < 0.012) {
          s.z = 1.0;
          s.x = (Math.random() - 0.5) * 2.2;
          s.y = (Math.random() - 0.5) * 1.45;
        }

        const q = 1 / s.z;
        const px = cx + s.x * q * Math.min(W, H) * 0.24;
        const py = cy + s.y * q * Math.min(W, H) * 0.24;

        if (px < -80 || px > W + 80 || py < -80 || py > H + 80) continue;

        const r = Math.min(3.2, 0.45 + q * 1.05);
        const tw = 0.72 + 0.28 * Math.sin(t * 0.0012 + s.p);
        const alpha = (0.22 + 0.62 * Math.min(1, q / 5)) * tw;

        ctx.fillStyle = `rgba(205, 235, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();

        // Speed streak / warp motion trail when close
        if (q > 3.8) {
          ctx.strokeStyle = 'rgba(110, 205, 255, 0.28)';
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(cx + (px - cx) * 0.94, cy + (py - cy) * 0.94);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

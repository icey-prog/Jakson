import { useEffect } from 'react';
import type { RefObject } from 'react';

/* Brand palette stops — jackson-deep #0F766E → jackson-vivid #14B8A6 */
const BRAND_DARK    = 'rgba(2,13,10,0)';
const BRAND_SHADOW  = (a: number) => `rgba(4,45,38,${a})`;
const BRAND_DEEP    = (a: number) => `rgba(15,118,110,${a})`;
const BRAND_VIVID   = (a: number) => `rgba(20,184,166,${a})`;

const FOLD_COUNT      = 28;
const ANIMATION_SPEED = 0.0015;
const BG_COLOR        = '#020d0b';

function drawFolds(
  canvasCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  canvasCtx.globalCompositeOperation = 'screen';

  for (let i = 0; i < FOLD_COUNT; i++) {
    const normalizedX    = i / FOLD_COUNT;
    const xPos           = normalizedX * width + Math.sin(time * 2 + i) * (width * 0.05);
    const foldWidth      = (width / FOLD_COUNT) * 3;

    const baseIntensity  = Math.sin(normalizedX * Math.PI) * 0.6 + 0.4;
    const waveIntensity  = (Math.sin(time * 3 + i * 0.4) + 1) * 0.5;
    const brightnessBoost = normalizedX * 0.5 + 0.5;
    const foldIntensity  = baseIntensity * waveIntensity * brightnessBoost;

    const gradient = canvasCtx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0,    BRAND_DARK);
    gradient.addColorStop(0.3,  BRAND_SHADOW(foldIntensity * 0.22));
    gradient.addColorStop(0.65, BRAND_DEEP(foldIntensity * 0.52));
    gradient.addColorStop(1,    BRAND_VIVID(foldIntensity * 0.88));

    canvasCtx.fillStyle = gradient;
    canvasCtx.beginPath();
    canvasCtx.rect(xPos - foldWidth / 2, 0, foldWidth, height);
    canvasCtx.fill();
  }
}

function drawAccentGlow(
  canvasCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  canvasCtx.globalCompositeOperation = 'source-over';
  const radial = canvasCtx.createRadialGradient(
    width * 0.8, height, 0,
    width * 0.8, height, height * 0.8,
  );
  radial.addColorStop(0, 'rgba(20,184,166,0.18)');
  radial.addColorStop(1, 'rgba(0,0,0,0)');
  canvasCtx.fillStyle = radial;
  canvasCtx.fillRect(0, 0, width, height);
}

export function useAuroraCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;

    let animationId: number;
    let time = 0;

    function resizeToParent() {
      if (!canvas) return;
      canvas.width  = canvas.parentElement?.clientWidth  ?? window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight;
    }

    function renderFrame() {
      if (!canvas || !canvasCtx) return;
      const { width, height } = canvas;
      time += ANIMATION_SPEED;

      canvasCtx.fillStyle = BG_COLOR;
      canvasCtx.fillRect(0, 0, width, height);

      drawFolds(canvasCtx, width, height, time);
      drawAccentGlow(canvasCtx, width, height);

      animationId = requestAnimationFrame(renderFrame);
    }

    window.addEventListener('resize', resizeToParent);
    resizeToParent();
    renderFrame();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeToParent);
    };
  }, [canvasRef]);
}

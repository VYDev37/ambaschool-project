// Zero-dependency Canvas Confetti Utility
export function triggerConfetti() {
  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '999999'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  const colors = [
    '#e63946', '#f0b429', '#38bdf8', '#34d399', '#a78bfa',
    '#fb7185', '#fbbf24', '#4ade80', '#60a5fa', '#f43f5e'
  ]

  const particleCount = 90
  const particles = []

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: width * (0.3 + Math.random() * 0.4),
      y: height * 0.4,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.9) * 14 - 3,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      wobble: 0,
      wobbleSpeed: Math.random() * 0.1 + 0.05,
      opacity: 1,
    })
  }

  let animationFrame
  let startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    ctx.clearRect(0, 0, width, height)

    let allDead = true

    for (let p of particles) {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.35 // gravity
      p.vx *= 0.98 // air resistance
      p.rotation += p.rotationSpeed
      p.wobble += p.wobbleSpeed

      if (elapsed > 1200) {
        p.opacity -= 0.025
      }

      if (p.opacity > 0) {
        allDead = false
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.fillStyle = p.color
        const w = p.size * Math.cos(p.wobble)
        ctx.fillRect(-w / 2, -p.size / 2, Math.abs(w), p.size)
        ctx.restore()
      }
    }

    if (!allDead && elapsed < 3500) {
      animationFrame = requestAnimationFrame(update)
    } else {
      cancelAnimationFrame(animationFrame)
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
    }
  }

  animationFrame = requestAnimationFrame(update)
}

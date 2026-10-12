/**
 * AgriConnect AI - Canvas Interactive Chart Engine
 * Lightweight, zero-dependency canvas renderer for market trends and AI price forecasts
 */

class AgriChart {
  /**
   * Draws a smooth line chart with gradient area fill
   * @param {HTMLCanvasElement} canvas 
   * @param {Object} options { labels: string[], data: number[], unit: string, lineColor: string, fillColor: string }
   */
  static renderLineChart(canvas, options = {}) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const {
      labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      data = [25, 26, 27, 28, 29, 30, 31],
      unit = '₹/kg',
      lineColor = '#2d6a4f',
      fillColor = 'rgba(82, 183, 136, 0.25)',
      pointColor = '#1b4332'
    } = options;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 35, right: 30, bottom: 45, left: 55 };

    ctx.clearRect(0, 0, width, height);

    if (!data.length) return;

    const minVal = Math.floor(Math.min(...data) * 0.9);
    const maxVal = Math.ceil(Math.max(...data) * 1.1) || 10;
    const valRange = maxVal - minVal || 1;

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Draw horizontal grid lines
    const gridLines = 4;
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#f1f5f9';
    ctx.fillStyle = '#64748b';
    ctx.font = '11px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'right';

    for (let i = 0; i <= gridLines; i++) {
      const yVal = minVal + (valRange / gridLines) * i;
      const yPos = padding.top + chartHeight - (chartHeight / gridLines) * i;

      ctx.beginPath();
      ctx.moveTo(padding.left, yPos);
      ctx.lineTo(width - padding.right, yPos);
      ctx.stroke();

      ctx.fillText(`₹${Math.round(yVal)}`, padding.left - 10, yPos + 4);
    }

    // Calculate coordinates
    const points = data.map((val, idx) => {
      const x = padding.left + (chartWidth / (data.length - 1 || 1)) * idx;
      const y = padding.top + chartHeight - ((val - minVal) / valRange) * chartHeight;
      return { x, y, val, label: labels[idx] };
    });

    // Draw Area Gradient
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
    gradient.addColorStop(0, fillColor);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.02)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpX = (prev.x + curr.x) / 2;
      ctx.bezierCurveTo(cpX, prev.y, cpX, curr.y, curr.x, curr.y);
    }
    ctx.lineTo(points[points.length - 1].x, padding.top + chartHeight);
    ctx.lineTo(points[0].x, padding.top + chartHeight);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw Line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpX = (prev.x + curr.x) / 2;
      ctx.bezierCurveTo(cpX, prev.y, cpX, curr.y, curr.x, curr.y);
    }
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw Points & Labels
    points.forEach((p, idx) => {
      // Point outer
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = pointColor;
      ctx.stroke();

      // Value label on top of point
      ctx.fillStyle = '#1b4332';
      ctx.font = 'bold 11px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`₹${p.val}`, p.x, p.y - 12);

      // X-axis label
      ctx.fillStyle = '#64748b';
      ctx.font = '11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(p.label, p.x, height - padding.bottom + 22);
    });
  }
}

window.AgriChart = AgriChart;

function polarToCartesian(cx, cy, angleDeg) {
    const angleRad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad)
    };
  }

  function generateArc(cx, cy, r, startAngle, endAngle) {
    const end = polarToCartesian(100, 100, 80, 270);
    print(end)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    print(largeArcFlag)
    const returnValue = `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
    print(returnValue)
    return returnValue;
  }

  const Arc = ({ radius = 80, startAngle = 0, endAngle = 270, cx = 100, cy = 100, stroke = "black", strokeWidth = 4}) => {
    const pathData = generateArc(cx, cy, radius, startAngle, endAngle);

    return (
      <svg width={cx*2} height={cy*2} xmlns="http://www.w3.org/2000/svg">
          <path
        d={pathData}
        fill="#0000FFA0"
        stroke="black"
        stroke-width="2" />
      </svg>
    )
  }

export default Arc
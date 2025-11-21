function polarToCartesian(cx, cy, r, angleDeg) {
    const angleRad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad)
    };
  }

  function generateArc(cx, cy, r, startAngle, endAngle) {
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);
    //console.log(start.x)
    //console.log(start.y)
    //console.log(end.x)
    //console.log(end.y)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    //console.log(largeArcFlag)
    const returnValue = `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y} L ${start.x} ${start.y+r} Z`
    //console.log(returnValue)

    return returnValue;
  }

  const Arc = ({ radius = 80, startAngle = 0, endAngle = 270, cx = 100, cy = 100, stroke = "black", strokeWidth = 4}) => {
    const pathData = generateArc(cx, cy, radius, startAngle, endAngle);

    return (
      <svg width={cx*2} height={cy*2} xmlns="http://www.w3.org/2000/svg">
          <path
        d={pathData}
        fill="#0000FFA0"
        stroke={stroke}
        strokeWidth={strokeWidth} />
      </svg>
    )
  }

export default Arc
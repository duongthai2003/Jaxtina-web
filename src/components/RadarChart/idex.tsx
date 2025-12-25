import { useEffect, useRef } from "react";
import styled from "styled-components";
import Chart, {
  ChartConfiguration,
  ChartData,
  ChartOptions,
} from "chart.js/auto";
import { useTheme } from "@/context/themeContext";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { device } from "@/utils/deviceBreakpoint";
import { themesDark, themesLight } from "@/configs/theme";

const Wrapper = styled.div`
  max-height: ${convertPixelToRem(280)};
  border-radius: ${convertPixelToRem(20)};
  padding: 0 ${convertPixelToRem(22)} 0 ${convertPixelToRem(15)};
  background: ${(p) => p.theme.auth.$chart_bg};
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${convertPixelToRem(device.tablet)}) {
    width: 100%;
    padding: 0 ${convertPixelToRem(5)} 0 0;
  }
`;

function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const { isDark } = useTheme();
  const currentTheme = isDark ? themesDark : themesLight;

  useEffect(() => {
    if (!canvasRef.current) return;

    // hủy chart cũ khi re-render
    if (chartRef.current) chartRef.current.destroy();

    const data: ChartData<"radar"> = {
      labels: ["Thực hành", "Viết", "Nói", "Đọc", "Nghe", "Từ vựng"],
      datasets: [
        {
          label: "Điểm",
          data: [7, 3, 3, 4, 5, 8],
          backgroundColor: currentTheme.auth.$radar_chart_bg,
          borderColor: currentTheme.auth.$border_radar_chart,
          borderWidth: 2,
          pointBackgroundColor: currentTheme.auth.$border_radar_chart,
        },
      ],
    };

    const options: ChartOptions<"radar"> = {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: { display: false },
          grid: { color: currentTheme.auth.$ccc },
          angleLines: { color: currentTheme.auth.$aaa },
          pointLabels: {
            font: { size: 13 },
            color: currentTheme.$tw_black,
          },
        },
      },
    };

    const config: ChartConfiguration<"radar"> = {
      type: "radar",
      data,
      options,
    };

    chartRef.current = new Chart(canvasRef.current, config);

    return () => {
      chartRef.current?.destroy();
    };
  }, [currentTheme]);

  return (
    <Wrapper>
      <canvas ref={canvasRef} width={300} height={300} />
    </Wrapper>
  );
}

export default RadarChart;

import React from "react";
import styled from "@emotion/styled";
import { Icon } from "metabase/ui";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 48px;
`;

const SearchBarContainer = styled.div`
  width: 100%;
  position: relative;
  group: hover;
`;

const SearchBarGlow = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 82, 255, 0.2) 0%, rgba(0, 224, 255, 0.2) 100%);
  border-radius: 16px;
  filter: blur(20px);
  opacity: 0.5;
  transition: all 0.5s ease;

  ${SearchBarContainer}:hover & {
    filter: blur(24px);
    opacity: 0.7;
  }
`;

const GlassSearchBar = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 82, 255, 0.08);
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 16px;
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: 0 0 0 2px rgba(0, 82, 255, 0.2), 0 8px 32px rgba(0, 82, 255, 0.08);
  }
`;

const SearchIconWrapper = styled.div`
  background: rgba(0, 82, 255, 0.1);
  color: var(--mb-color-brand);
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 15px;
  font-weight: 500;
  color: #1e293b;

  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }
`;

const AnalyzeButton = styled.button`
  background-color: var(--mb-color-brand);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 82, 255, 0.3);
  transition: background-color 0.2s;

  &:hover {
    background-color: #003ec7;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  width: 100%;
`;

const LeftColumn = styled.div`
  grid-column: span 12;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 1200px) {
    grid-column: span 8;
  }
`;

const RightColumn = styled.div`
  grid-column: span 12;

  @media (min-width: 1200px) {
    grid-column: span 4;
  }
`;

const ChartCard = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, rgba(248, 250, 252, 0.8) 100%);
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 24px rgba(0, 82, 255, 0.06);
  padding: 24px;
  min-height: 400px;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
`;

const ChartTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 100px;
  background-color: #d1fae5;
  color: #047857;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid #a7f3d0;
`;

const ChartSubtitle = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;

const ChartPlaceholder = styled.div`
  width: 100%;
  height: 280px;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(239, 246, 255, 0.5) 0%, rgba(248, 250, 252, 0) 100%);
  border-bottom: 2px solid var(--mb-color-brand);
  position: relative;
  display: flex;
  align-items: flex-end;
`;

const MetricCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
`;

const MetricCard = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 24px rgba(0, 82, 255, 0.03);
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 10;
`;

const MetricLabel = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 8px 0;
`;

const MetricValue = styled.h3`
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const MetricIconWrapper = styled.div<{ color: string; bg: string; borderColor: string }>`
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.borderColor};
  padding: 12px;
  border-radius: 12px;
`;

const MetricChange = styled.div<{ positive?: boolean }>`
  margin-top: 20px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.positive ? "#059669" : "#64748b")};
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  z-index: 10;
`;

const InsightsSidebar = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px rgba(0, 82, 255, 0.12);
  padding: 24px;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const InsightsSidebarGlow = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--mb-color-brand) 0%, #00e0ff 100%);
  box-shadow: 0 0 15px rgba(0, 224, 255, 0.5);
`;

const InsightsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  position: relative;
  z-index: 10;
`;

const InsightsIconWrapper = styled.div`
  background: linear-gradient(135deg, var(--mb-color-brand) 0%, #003ec7 100%);
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
`;

const InsightsTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

const InsightCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 10;
`;

const InsightCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const InsightCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const InsightBadge = styled.span<{ type: "discovery" | "warning" | "optimization" }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;

  ${(props) =>
    props.type === "discovery" &&
    `
    color: #4f46e5;
    background-color: #eef2ff;
  `}

  ${(props) =>
    props.type === "warning" &&
    `
    color: #d97706;
    background-color: #fffbeb;
    border: 1px solid #fef3c7;
  `}

  ${(props) =>
    props.type === "optimization" &&
    `
    color: #059669;
    background-color: #ecfdf5;
  `}
`;

const InsightTime = styled.span`
  font-size: 11px;
  color: #94a3b8;
  font-family: monospace;
`;

const InsightText = styled.p`
  font-size: 14px;
  color: #334155;
  line-height: 1.5;
  margin: 0 0 16px 0;
`;

const InsightAction = styled.button`
  background: rgba(0, 82, 255, 0.05);
  color: var(--mb-color-brand);
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 82, 255, 0.1);
  }
`;

export const AILandingDashboard = () => {
  return (
    <DashboardContainer>
      <SearchBarContainer>
        <SearchBarGlow />
        <GlassSearchBar>
          <SearchIconWrapper>
            <Icon name="star" size={20} />
          </SearchIconWrapper>
          <SearchInput placeholder="请让 TenvioX AI 帮您分析收入异常或生成预测模型..." />
          <AnalyzeButton>分析</AnalyzeButton>
        </GlassSearchBar>
      </SearchBarContainer>

      <GridContainer>
        <LeftColumn>
          <ChartCard>
            <ChartHeader>
              <div>
                <ChartTitle>
                  查询轨迹与延迟预测
                  <Badge>应用中模型</Badge>
                </ChartTitle>
                <ChartSubtitle>未来24小时实时性能预测</ChartSubtitle>
              </div>
              <Icon name="dashboard" size={20} style={{ color: "#94a3b8" }} />
            </ChartHeader>
            <ChartPlaceholder />
          </ChartCard>

          <MetricCardsContainer>
            <MetricCard>
              <MetricHeader>
                <div>
                  <MetricLabel>预测准确率</MetricLabel>
                  <MetricValue>94.8%</MetricValue>
                </div>
                <MetricIconWrapper color="#00a8cc" bg="rgba(0, 224, 255, 0.1)" borderColor="rgba(0, 224, 255, 0.2)">
                  <Icon name="check" size={20} />
                </MetricIconWrapper>
              </MetricHeader>
              <MetricChange positive>
                <Icon name="arrow_up" size={16} />
                较上周提升 2.4%
              </MetricChange>
            </MetricCard>

            <MetricCard>
              <MetricHeader>
                <div>
                  <MetricLabel>拦截异常数</MetricLabel>
                  <MetricValue>1,204</MetricValue>
                </div>
                <MetricIconWrapper color="var(--mb-color-brand)" bg="rgba(0, 82, 255, 0.1)" borderColor="rgba(0, 82, 255, 0.2)">
                  <Icon name="warning" size={20} />
                </MetricIconWrapper>
              </MetricHeader>
              <MetricChange>
                <span style={{ fontWeight: 700, color: "#1e293b", marginRight: "4px" }}>3</span> 项需立即排查
              </MetricChange>
            </MetricCard>
          </MetricCardsContainer>
        </LeftColumn>

        <RightColumn>
          <InsightsSidebar>
            <InsightsSidebarGlow />
            <InsightsHeader>
              <InsightsIconWrapper>
                <Icon name="cpu" size={20} />
              </InsightsIconWrapper>
              <InsightsTitle>TenvioX AI 洞察</InsightsTitle>
            </InsightsHeader>

            <InsightCardsContainer>
              <InsightCard>
                <InsightCardHeader>
                  <InsightBadge type="discovery">
                    <Icon name="star" size={12} /> 发现
                  </InsightBadge>
                  <InsightTime>1分钟前</InsightTime>
                </InsightCardHeader>
                <InsightText>
                  检测到来自欧洲地区的<strong>查询量</strong>出现异常飙升。这与新一轮营销活动的发布高度相关。
                </InsightText>
                <InsightAction>
                  查看详情 <Icon name="chevron_right" size={12} />
                </InsightAction>
              </InsightCard>

              <InsightCard>
                <InsightCardHeader>
                  <InsightBadge type="warning">
                    <Icon name="warning" size={12} /> 警告
                  </InsightBadge>
                  <InsightTime>12分钟前</InsightTime>
                </InsightCardHeader>
                <InsightText>
                  接口 /api/v1/predict 的延迟正逼近 120ms 阈值，建议进行垂直扩容。
                </InsightText>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button style={{ background: "#0f172a", color: "white", padding: "8px 12px", borderRadius: "8px", fontSize: "11px", fontWeight: 700, border: "none" }}>扩容实例</button>
                  <button style={{ background: "white", color: "#475569", padding: "8px 12px", borderRadius: "8px", fontSize: "11px", fontWeight: 700, border: "1px solid #e2e8f0" }}>忽略</button>
                </div>
              </InsightCard>

              <InsightCard>
                <InsightCardHeader>
                  <InsightBadge type="optimization">
                    <Icon name="check" size={12} /> 优化
                  </InsightBadge>
                  <InsightTime>1小时前</InsightTime>
                </InsightCardHeader>
                <InsightText>
                  我在后台优化了 4 个慢查询 SQL，将数据集平均加载时间降低了 14%。
                </InsightText>
                <InsightAction>
                  审核变更 <Icon name="chevron_right" size={12} />
                </InsightAction>
              </InsightCard>
            </InsightCardsContainer>
          </InsightsSidebar>
        </RightColumn>
      </GridContainer>
    </DashboardContainer>
  );
};

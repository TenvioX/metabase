import React from "react";
import styled from "@emotion/styled";
import { Icon } from "metabase/ui";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: var(--mb-color-background-secondary);
  overflow: hidden;
  position: relative;
`;

const ChatHistory = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const MessageBubble = styled.div<{ isUser?: boolean }>`
  max-width: 80%;
  padding: 16px 20px;
  border-radius: 16px;
  font-size: 15px;
  line-height: 1.5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  background-color: ${(props) =>
    props.isUser ? "var(--mb-color-brand)" : "#ffffff"};
  color: ${(props) => (props.isUser ? "#ffffff" : "#1e293b")};
  border-bottom-right-radius: ${(props) => (props.isUser ? "4px" : "16px")};
  border-bottom-left-radius: ${(props) => (props.isUser ? "16px" : "4px")};
  border: ${(props) => (props.isUser ? "none" : "1px solid #e2e8f0")};
`;

const HeaderArea = styled.div`
  padding: 24px 32px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e8f0;
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InputContainer = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  position: relative;
`;

const GlassInputArea = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 82, 255, 0.08);
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 16px;
  transition: all 0.2s ease;

  &:focus-within {
    box-shadow: 0 0 0 2px rgba(0, 82, 255, 0.2), 0 8px 32px rgba(0, 82, 255, 0.08);
  }
`;

const InputField = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: 500;
  color: #1e293b;

  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }
`;

const SendButton = styled.button`
  background-color: var(--mb-color-brand);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 82, 255, 0.3);
  transition: background-color 0.2s;

  &:hover {
    background-color: #003ec7;
  }
`;

const RecommendationChips = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const Chip = styled.button`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);

  &:hover {
    border-color: var(--mb-color-brand);
    color: var(--mb-color-brand);
    background-color: #eff6ff;
  }
`;

const SparkleIconWrapper = styled.div`
  background-color: rgba(0, 82, 255, 0.1);
  color: var(--mb-color-brand);
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AIChatPage = () => {
  return (
    <PageContainer>
      <HeaderArea>
        <HeaderTitle>
          <SparkleIconWrapper>
            <Icon name="star" size={20} />
          </SparkleIconWrapper>
          TenvioX AI 副驾驶
        </HeaderTitle>
      </HeaderArea>
      <ChatHistory>
        <MessageBubble>
          您好！我是 TenvioX AI。我可以帮您分析数据异常、生成 SQL 查询，或是探索收入趋势。您今天想分析些什么？
        </MessageBubble>
        <MessageBubble isUser>
          您能分析一下过去24小时的查询轨迹和延迟预测吗？
        </MessageBubble>
        <MessageBubble>
          没问题！我检测到来自欧洲地区的查询量出现了与新营销活动相关的异常飙升，且接口延迟正逼近 120ms 阈值。
        </MessageBubble>
      </ChatHistory>
      <InputContainer>
        <RecommendationChips>
          <Chip>解释欧洲区销售异常</Chip>
          <Chip>生成收入预测模型</Chip>
          <Chip>优化系统慢查询</Chip>
        </RecommendationChips>
        <GlassInputArea>
          <SparkleIconWrapper>
            <Icon name="star" size={16} />
          </SparkleIconWrapper>
          <InputField placeholder="向 TenvioX AI 提问以分析您的数据..." />
          <SendButton>发送</SendButton>
        </GlassInputArea>
      </InputContainer>
    </PageContainer>
  );
};

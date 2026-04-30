import React from "react";
import styled from "@emotion/styled";
import { Icon } from "metabase/ui";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: var(--mb-color-background-secondary);
  overflow-y: auto;
  padding: 40px;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SectionContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 24px rgba(0, 82, 255, 0.03);
`;

const SectionHeader = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;

const ProviderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const ProviderCard = styled.div<{ active?: boolean }>`
  border: 2px solid ${(props) => (props.active ? "var(--mb-color-brand)" : "#e2e8f0")};
  background-color: ${(props) => (props.active ? "#eff6ff" : "#ffffff")};
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover {
    border-color: ${(props) => (props.active ? "var(--mb-color-brand)" : "#cbd5e1")};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const ProviderName = styled.span<{ active?: boolean }>`
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => (props.active ? "var(--mb-color-brand)" : "#334155")};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #334155;
`;

const Input = styled.input`
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--mb-color-brand);
    box-shadow: 0 0 0 2px rgba(0, 82, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  min-height: 120px;
  outline: none;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--mb-color-brand);
    box-shadow: 0 0 0 2px rgba(0, 82, 255, 0.1);
  }
`;

const SaveButton = styled.button`
  background-color: var(--mb-color-brand);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-end;
  box-shadow: 0 4px 12px rgba(0, 82, 255, 0.2);
  transition: background-color 0.2s;

  &:hover {
    background-color: #003ec7;
  }
`;

export const AISettingsPage = () => {
  return (
    <PageContainer>
      <ContentWrapper>
        <PageTitle>
          <Icon name="gear" size={24} />
          AI 引擎设置
        </PageTitle>

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>LLM 模型提供商</SectionTitle>
            <SectionDescription>选择驱动 TenvioX AI 的底层语言模型。</SectionDescription>
          </SectionHeader>
          <ProviderGrid>
            <ProviderCard active>
              <Icon name="cloud" size={20} />
              <ProviderName active>OpenAI (GPT-4o)</ProviderName>
            </ProviderCard>
            <ProviderCard>
              <Icon name="cloud" size={20} />
              <ProviderName>Anthropic (Claude 3.5)</ProviderName>
            </ProviderCard>
            <ProviderCard>
              <Icon name="cloud" size={20} />
              <ProviderName>Local (Llama 3)</ProviderName>
            </ProviderCard>
          </ProviderGrid>
        </SectionContainer>

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>系统级指令</SectionTitle>
            <SectionDescription>配置 AI 的基础提示词模板与知识边界。</SectionDescription>
          </SectionHeader>
          
          <FormGroup>
            <Label>API 基础路由</Label>
            <Input defaultValue="https://api.openai.com/v1" />
          </FormGroup>

          <FormGroup>
            <Label>全局系统提示词</Label>
            <TextArea defaultValue="你是 TenvioX AI，一个嵌入在金融智能平台中的高级数据分析助手。你的目标是分析数据、发现异常，并帮助用户理解其商业智能指标。请始终保持严谨，并基于所提供的数据进行回答。" />
          </FormGroup>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
             <SaveButton>保存设置</SaveButton>
          </div>
        </SectionContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

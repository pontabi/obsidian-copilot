import CopilotPlugin from "@/main";
import { Notice } from 'obsidian';
import React, { Fragment, useState } from 'react';
import { ChatModelDisplayNames, DEFAULT_SETTINGS, DISPLAY_NAME_TO_MODEL } from '../../constants';
import AdvancedSettings from './AdvancedSettings';
import ApiSettings from './ApiSettings';
import CommandToggleSettings from './CommandToggleSettings';
import LocalCopilotSettings from './LocalCopilotSettings';
import QASettings from './QASettings';
import { DropdownComponent, SliderComponent, TextComponent } from './SettingBlocks';

interface SettingsMainProps {
  plugin: CopilotPlugin;
  reloadPlugin: () => Promise<void>;
}

export default function SettingsMain({ plugin, reloadPlugin }: SettingsMainProps) {
  const [defaultModelDisplayName, setDefaultModelDisplayName] = useState(plugin.settings.defaultModelDisplayName);
  const [defaultSaveFolder, setDefaultSaveFolder] = useState(plugin.settings.defaultSaveFolder);
  const [temperature, setTemperature] = useState(plugin.settings.temperature);
  const [maxTokens, setMaxTokens] = useState(plugin.settings.maxTokens);
  const [contextTurns, setContextTurns] = useState(plugin.settings.contextTurns);

  // API settings
  const [openAIApiKey, setOpenAIApiKey] = useState(plugin.settings.openAIApiKey);
  const [openAIOrgId, setOpenAIOrgId] = useState(plugin.settings.openAIOrgId);
  const [openAICustomModel, setOpenAICustomModel] = useState(plugin.settings.openAICustomModel);

  const [googleApiKey, setGoogleApiKey] = useState(plugin.settings.googleApiKey);
  const [googleCustomModel, setGoogleCustomModel] = useState(plugin.settings.googleCustomModel);

  const [anthropicApiKey, setAnthropicApiKey] = useState(plugin.settings.anthropicApiKey);
  const [anthropicModel, setAnthropicModel] = useState(plugin.settings.anthropicModel);

  const [openRouterAiApiKey, setOpenRouterAiApiKey] = useState(plugin.settings.openRouterAiApiKey);
  const [openRouterModel, setOpenRouterModel] = useState(plugin.settings.openRouterModel);

  const [azureOpenAIApiKey, setAzureOpenAIApiKey] = useState(plugin.settings.azureOpenAIApiKey);
  const [azureOpenAIApiInstanceName, setAzureOpenAIApiInstanceName] = useState(plugin.settings.azureOpenAIApiInstanceName);
  const [azureOpenAIApiDeploymentName, setAzureOpenAIApiDeploymentName] = useState(plugin.settings.azureOpenAIApiDeploymentName);
  const [azureOpenAIApiVersion, setAzureOpenAIApiVersion] = useState(plugin.settings.azureOpenAIApiVersion);
  const [azureOpenAIApiEmbeddingDeploymentName, setAzureOpenAIApiEmbeddingDeploymentName] = useState(plugin.settings.azureOpenAIApiEmbeddingDeploymentName);

  const [groqApiKey, setGroqApiKey] = useState(plugin.settings.groqApiKey);
  const [groqModel, setGroqModel] = useState(plugin.settings.groqModel);

  // QA settings
  const [embeddingModel, setEmbeddingModel] = useState(plugin.settings.embeddingModel);
  const [cohereApiKey, setCohereApiKey] = useState(plugin.settings.cohereApiKey);
  const [huggingfaceApiKey, setHuggingfaceApiKey] = useState(plugin.settings.huggingfaceApiKey);
  const [indexVaultToVectorStore, setIndexVaultToVectorStore] = useState(plugin.settings.indexVaultToVectorStore);
  const [maxSourceChunks, setMaxSourceChunks] = useState(plugin.settings.maxSourceChunks);

  // Advanced settings
  const [userSystemPrompt, setUserSystemPrompt] = useState(plugin.settings.userSystemPrompt);
  const [openAIProxyBaseUrl, setOpenAIProxyBaseUrl] = useState(plugin.settings.openAIProxyBaseUrl);
  const [useOpenAILocalProxy, setUseOpenAILocalProxy] = useState(plugin.settings.useOpenAILocalProxy);
  const [openAIProxyModelName, setOpenAIProxyModelName] = useState(plugin.settings.openAIProxyModelName);
  const [openAIEmbeddingProxyBaseUrl, setOpenAIEmbeddingProxyBaseUrl] = useState(plugin.settings.openAIEmbeddingProxyBaseUrl);
  const [openAIEmbeddingProxyModelName, setOpenAIEmbeddingProxyModelName] = useState(plugin.settings.openAIEmbeddingProxyModelName);

  // Local Copilot Settings
  const [lmStudioBaseUrl, setlmStudioBaseUrl] = useState(plugin.settings.lmStudioBaseUrl);
  const [ollamaModel, setOllamaModel] = useState(plugin.settings.ollamaModel);
  const [ollamaBaseUrl, setOllamaBaseUrl] = useState(plugin.settings.ollamaBaseUrl);

  // Built-in Command Toggles
  const [enabledCommands, setEnabledCommands] = useState(plugin.settings.enabledCommands);

  // NOTE: When new settings are added, make sure to add them to saveAllSettings
  const saveAllSettings = async () => {
    plugin.settings.defaultModelDisplayName = defaultModelDisplayName;
    plugin.settings.defaultModel = DISPLAY_NAME_TO_MODEL[defaultModelDisplayName];
    plugin.settings.defaultSaveFolder = defaultSaveFolder;
    plugin.settings.temperature = temperature;
    plugin.settings.maxTokens = maxTokens;
    plugin.settings.contextTurns = contextTurns;

    // API settings
    plugin.settings.openAIApiKey = openAIApiKey;
    plugin.settings.openAIOrgId = openAIOrgId;
    plugin.settings.openAICustomModel = openAICustomModel;

    plugin.settings.googleApiKey = googleApiKey;
    plugin.settings.googleCustomModel = googleCustomModel;

    plugin.settings.anthropicApiKey = anthropicApiKey;
    plugin.settings.anthropicModel = anthropicModel;
    plugin.settings.openRouterAiApiKey = openRouterAiApiKey;
    plugin.settings.openRouterModel = openRouterModel;
    plugin.settings.azureOpenAIApiKey = azureOpenAIApiKey;
    plugin.settings.azureOpenAIApiInstanceName = azureOpenAIApiInstanceName;
    plugin.settings.azureOpenAIApiDeploymentName = azureOpenAIApiDeploymentName;
    plugin.settings.azureOpenAIApiVersion = azureOpenAIApiVersion;
    plugin.settings.azureOpenAIApiEmbeddingDeploymentName = azureOpenAIApiEmbeddingDeploymentName;
    plugin.settings.groqApiKey = groqApiKey;
    plugin.settings.groqModel = groqModel;

    // QA settings
    plugin.settings.embeddingModel = embeddingModel;
    plugin.settings.cohereApiKey = cohereApiKey;
    plugin.settings.huggingfaceApiKey = huggingfaceApiKey;
    plugin.settings.indexVaultToVectorStore = indexVaultToVectorStore;
    plugin.settings.maxSourceChunks = maxSourceChunks;

    // Advanced settings
    plugin.settings.userSystemPrompt = userSystemPrompt;
    plugin.settings.openAIProxyBaseUrl = openAIProxyBaseUrl;
    plugin.settings.useOpenAILocalProxy = useOpenAILocalProxy;
    plugin.settings.openAIProxyModelName = openAIProxyModelName;
    plugin.settings.openAIEmbeddingProxyBaseUrl = openAIEmbeddingProxyBaseUrl;
    plugin.settings.openAIEmbeddingProxyModelName = openAIEmbeddingProxyModelName;

    // Local Copilot Settings
    plugin.settings.lmStudioBaseUrl = lmStudioBaseUrl;
    plugin.settings.ollamaModel = ollamaModel;
    plugin.settings.ollamaBaseUrl = ollamaBaseUrl;

    plugin.settings.enabledCommands = enabledCommands;

    await plugin.saveSettings();
    await reloadPlugin();
    new Notice('Settings have been saved and the plugin has been reloaded.');
  };

  const resetToDefaultSettings = async () => {
    plugin.settings = DEFAULT_SETTINGS;
    await plugin.saveSettings();
    await reloadPlugin();
    new Notice('Settings have been reset to their default values.');
  };

  return (
    <>
      <div>
        <h2>Copilot Settings</h2>
        <div className="button-container">
          <button className="mod-cta" onClick={saveAllSettings}>
            Save and Reload
          </button>
          <button className="mod-cta" onClick={resetToDefaultSettings}>
            Reset to Default Settings
          </button>
        </div>
        <div className="warning-message">
          Please Save and Reload the plugin when you change any setting below!
        </div>

        <DropdownComponent
          name="Default Model"
          options={Object.values(ChatModelDisplayNames)}
          value={defaultModelDisplayName}
          onChange={setDefaultModelDisplayName}
        />
        <TextComponent
          name="Default Conversation Folder Name"
          description="The default folder name where chat conversations will be saved. Default is 'copilot-conversations'"
          placeholder="copilot-conversations"
          value={defaultSaveFolder}
          onChange={setDefaultSaveFolder}
        />
        <h6>
          Please be mindful of the number of tokens and context conversation turns you set here, as they will affect the cost of your API requests.
        </h6>
        <SliderComponent
          name="Temperature"
          description="Default is 0.1. Higher values will result in more creativeness, but also more mistakes. Set to 0 for no randomness."
          min={0}
          max={2}
          step={0.05}
          value={temperature}
          onChange={async (value) => {
            setTemperature(value);
          }}
        />
        <SliderComponent
          name="Token limit"
          description={
            <Fragment>
              <p>The maximum number of <em>output tokens</em> to generate. Default is 1000.</p>
              <em>This number plus the length of your prompt (input tokens) must be smaller than the context window of the model.</em>
            </Fragment>
          }
          min={0}
          max={10000}
          step={100}
          value={maxTokens}
          onChange={async (value) => {
            setMaxTokens(value);
          }}
        />
        <SliderComponent
          name="Conversation turns in context"
          description="The number of previous conversation turns to include in the context. Default is 15 turns, i.e. 30 messages."
          min={1}
          max={30}
          step={1}
          value={contextTurns}
          onChange={async (value) => {
            setContextTurns(value);
          }}
        />
        <CommandToggleSettings
          enabledCommands={enabledCommands}
          setEnabledCommands={setEnabledCommands}
        />
      </div>

      <ApiSettings
        openAIApiKey={openAIApiKey}
        setOpenAIApiKey={setOpenAIApiKey}
        openAIOrgId={openAIOrgId}
        setOpenAIOrgId={setOpenAIOrgId}
        openAICustomModel={openAICustomModel}
        setOpenAICustomModel={setOpenAICustomModel}
        googleApiKey={googleApiKey}
        setGoogleApiKey={setGoogleApiKey}
        googleCustomModel={googleCustomModel}
        setGoogleCustomModel={setGoogleCustomModel}
        anthropicApiKey={anthropicApiKey}
        setAnthropicApiKey={setAnthropicApiKey}
        anthropicModel={anthropicModel}
        setAnthropicModel={setAnthropicModel}
        openRouterAiApiKey={openRouterAiApiKey}
        setOpenRouterAiApiKey={setOpenRouterAiApiKey}
        openRouterModel={openRouterModel}
        setOpenRouterModel={setOpenRouterModel}
        azureOpenAIApiKey={azureOpenAIApiKey}
        setAzureOpenAIApiKey={setAzureOpenAIApiKey}
        azureOpenAIApiInstanceName={azureOpenAIApiInstanceName}
        setAzureOpenAIApiInstanceName={setAzureOpenAIApiInstanceName}
        azureOpenAIApiDeploymentName={azureOpenAIApiDeploymentName}
        setAzureOpenAIApiDeploymentName={setAzureOpenAIApiDeploymentName}
        azureOpenAIApiVersion={azureOpenAIApiVersion}
        setAzureOpenAIApiVersion={setAzureOpenAIApiVersion}
        azureOpenAIApiEmbeddingDeploymentName={azureOpenAIApiEmbeddingDeploymentName}
        setAzureOpenAIApiEmbeddingDeploymentName={setAzureOpenAIApiEmbeddingDeploymentName}
        groqApiKey={groqApiKey}
        setGroqApiKey={setGroqApiKey}
        groqModel={groqModel}
        setGroqModel={setGroqModel}
      />
      <QASettings
        embeddingModel={embeddingModel}
        setEmbeddingModel={setEmbeddingModel}
        cohereApiKey={cohereApiKey}
        setCohereApiKey={setCohereApiKey}
        huggingfaceApiKey={huggingfaceApiKey}
        setHuggingfaceApiKey={setHuggingfaceApiKey}
        indexVaultToVectorStore={indexVaultToVectorStore}
        setIndexVaultToVectorStore={setIndexVaultToVectorStore}
        maxSourceChunks={maxSourceChunks}
        setMaxSourceChunks={setMaxSourceChunks}
      />
      <AdvancedSettings
        openAIProxyBaseUrl={openAIProxyBaseUrl}
        setOpenAIProxyBaseUrl={setOpenAIProxyBaseUrl}
        useOpenAILocalProxy={useOpenAILocalProxy}
        setUseOpenAILocalProxy={setUseOpenAILocalProxy}
        openAIProxyModelName={openAIProxyModelName}
        setOpenAIProxyModelName={setOpenAIProxyModelName}
        openAIEmbeddingProxyBaseUrl={openAIEmbeddingProxyBaseUrl}
        setOpenAIEmbeddingProxyBaseUrl={setOpenAIEmbeddingProxyBaseUrl}
        openAIEmbeddingProxyModelName={openAIEmbeddingProxyModelName}
        setOpenAIEmbeddingProxyModelName={setOpenAIEmbeddingProxyModelName}
        userSystemPrompt={userSystemPrompt}
        setUserSystemPrompt={setUserSystemPrompt}
      />
      <LocalCopilotSettings
        lmStudioBaseUrl={lmStudioBaseUrl}
        setlmStudioBaseUrl={setlmStudioBaseUrl}
        ollamaModel={ollamaModel}
        setOllamaModel={setOllamaModel}
        ollamaBaseUrl={ollamaBaseUrl}
        setOllamaBaseUrl={setOllamaBaseUrl}
      />
    </>
  );
}

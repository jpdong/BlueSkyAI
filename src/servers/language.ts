import {apiKey, baseUrl} from "~/configs/openaiConfig";

export const model = 'openai/gpt-4o';
export const temperature = 0
export const getLanguage = async (content: string) => {
  // Check if API key is configured
  if (!apiKey) {
    console.warn('OPENAI_API_KEY is not configured, defaulting to English');
    return 'en';
  }

  let body = {
    messages: [
      {
        role: 'system',
        content: `你是一个语言分析专家，能够直接识别文本是什么语言，并且区分繁体中文和简体中文，如果是繁体中文则返回tw，简体中文返回zh。`
      },
      {
        role: 'system',
        content: `识别这段文字的语言，只返回语言的英文缩写，不含任何解释！`
      },
      {
        role: 'user',
        content: `需要识别的内容: ${content}`
      }
    ],
    model: model,
    temperature: temperature,
    stream: false
  }

  try {
    let languageResult = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`
      }
    });

    if (!languageResult.ok) {
      console.error('API request failed:', languageResult.status, languageResult.statusText);
      return 'en';
    }

    const data = await languageResult.json();
    
    // console.log('content-=->', content);
    // console.log('languageResult-=->', data);
    // console.log('languageResult?.choices[0]?.message-=->', data?.choices?.[0]?.message);
    
    // Check if the response has the expected structure
    if (!data?.choices?.[0]?.message?.content) {
      console.error('Unexpected API response structure:', data);
      return 'en';
    }

    const lang = data.choices[0].message.content.substring(0, 2) || 'en';
    // console.log('lang->', lang);
    return lang;
  } catch (err) {
    console.error('Error in getLanguage:', err);
    return 'en';
  }
}

import { apiKey, baseUrl, getCurrentLanguage, model, temperature } from "~/configs/openaiConfig";

export const translateContent = async (userContent: string, to: string) => {
  // Check if API key is configured
  if (!apiKey) {
    console.warn('OPENAI_API_KEY is not configured, returning original content');
    return userContent;
  }

  let currentLanguage = getCurrentLanguage(to)
  const body = {
    messages: [
      {
        role: 'system',
        content: `${currentLanguage.systemPrompt}`
      },
      {
        role: 'system',
        content: `${currentLanguage.systemPrompt2}`
      },
      {
        role: 'system',
        content: `${currentLanguage.systemPrompt3}`
      },
      {
        role: 'system',
        content: `${currentLanguage.systemPrompt4}`
      },
      {
        role: 'user',
        content: `${currentLanguage.userPrompt}: '${userContent}'`
      }
    ],
    model: model,
    temperature: temperature,
    stream: false,
    response_format: {
      type: 'json_object'
    }
  }

  try {
    // console.log('requestBody->>>>', body);
    const response = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`
      }
    });

    if (!response.ok) {
      console.error('Translation API request failed:', response.status, response.statusText);
      return userContent;
    }

    const translateResult = await response.json();
    // console.log('translateResult->>>>', translateResult);

    // Check if the response has the expected structure
    if (!translateResult?.choices?.[0]?.message?.content) {
      console.error('Unexpected translation API response structure:', translateResult);
      return userContent;
    }

    // console.log('translateResult.choices[0].message-->>>>', translateResult.choices[0].message);
    // console.log('translateResult.choices[0].message?.content-->>>>', translateResult.choices[0].message?.content);

    try {
      const parsedContent = JSON.parse(translateResult.choices[0].message.content);
      const translateResultText = parsedContent.text || userContent;
      return translateResultText;
    } catch (parseError) {
      console.error('Error parsing translation JSON response:', parseError);
      console.error('Raw content:', translateResult.choices[0].message.content);
      return userContent;
    }

  } catch (error) {
    console.error('Error in translateContent:', error);
    return userContent;
  }
}





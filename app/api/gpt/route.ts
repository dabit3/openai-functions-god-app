import { NextRequest, NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_TOKEN || ''
})

const KEY = process.env.OPENAI_API_KEY
const base_uri = 'https://api.openai.com/v1/chat/completions'

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${KEY}`
}

const data = {
  'model': 'gpt-4'
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { query } = await req.json()

    const requestData = {
      ...data,
      'messages': [
        {'role': 'user', 'content': query }
      ],
      functions: [
        {
          name: 'createVideo',
          description: 'generate a video using replicate, an AI LLM',
          parameters: {
            type: 'object',
            properties: {
              prompt: {
                type: 'string',
                description: 'the main prompt that should be passed in to the LLM'
              },
              guidance_scale: {
                type: 'integer',
                description: 'This is the requested guidance scale for the video in a numeric value. Default to 17.5 if none is defined in the prompt.'
              },
              num_frames: {
                type: 'integer',
                description: 'The number of frames if defined in the prompt'
              },
              height: {
                type: 'integer',
                description: 'The height of the video if defined in the prompt. Not affected by resolution.'
              },
              width: {
                type: 'integer',
                description: 'The width of the video if defined in the prompt. Not affected by resolution.'
              }
            },
            'required': ['prompt', 'guidance_scale'],
          }
        },
        {
          name: 'createMusic',
          description: 'generate music using replicate',
          parameters: {
            type: 'object',
            properties: {
              prompt: {
                type: 'string',
                description: 'the exact prompt passed in'
              }
            }
          }
        },
        {
          name: 'createImage',
          description: 'generates an image using replicate',
          parameters: {
            type: 'object',
            properties: {
              prompt: {
                type: 'string',
                description: 'the exact prompt passed in'
              }
            }
          }
        }
      ],
      function_call: 'auto'
    }

    const response = await fetch(base_uri, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestData)
    })

    const json = await response.json()
    let choice = json.choices[0]
    
    const { function_call } = choice.message
    console.log('function_call: ', function_call)
    if (function_call) {
      const args = JSON.parse(function_call.arguments)
      if (function_call.name === 'createVideo') {
        const output = await replicate.run(
          'anotherjesse/zeroscope-v2-xl:71996d331e8ede8ef7bd76eba9fae076d31792e4ddf4ad057779b443d6aea62f',
          {
            input: {
              ...args,
            }
          }
        );
        return NextResponse.json({
          data: output,
          type: 'video'
        });
      }
      if (function_call.name === 'createMusic') {
        const output = await replicate.run(
          'joehoover/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906',
          {
            input: {
              model_version: 'melody',
              ...args
            }
          }
        )
        return NextResponse.json({
          data: output,
          type: 'audio'
        });
      }
      if (function_call.name === 'createImage') {
        const output = await replicate.run(
          'ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f',
          {
            input: {
              ...args
            }
          }
        )
        return NextResponse.json({
          data: output,
          type: 'image'
        });
      }
    }

    else {
      console.log('choice: ', choice)
      return NextResponse.json({
        data: choice.message.content,
        type: 'text',
      });
    }
  } catch (err) {
    console.log('error: ', err)
    return NextResponse.json({ error: err });
  }
}
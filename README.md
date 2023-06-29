## God app

This is an experimental project using OpenAI GPT Plugins and Replicate to combine all AI APis into one.

Instead of using separate interfaces for image generation, video generation, audio generation, and general text natural language processing, this app combines all of them together into a single prompt.

APIs currently supported:
- Text to image
- Text to video
- Text to audio
- General natural language processing

Examples of what you might ask:

- Create a 4 day travel itinerary for Mexico City.
- Create an image of someone in their production studio creating beats, futuristic, dim lighting, bronx new york
- Create a track that sounds like it might come from kanye west, hip-hop, soul samples, heavy drums, innovative melodies, experimental sounds, unusual effects, automation, modulating filters, distortion effects
- Create a video of clown fish swimming in a coral reef, beautiful, 8k, perfect, award winning, national geographic

## Prerequisites

To run this app, you must have the following:

1. OpenAI API Key
2. Replicate token

## Running the app

To run this app, follow these steps:

1. Clone the repo

```sh
git clone git@github.com:dabit3/openai-functions-god-app.git
```

2. Change into the directory and install the dependencies:

```sh
cd openai-functions-god-app
npm install
```

3. Set environment variables in a file named `.env.local` (you can copy `.example.env.local`)

```
OPENAI_API_KEY=
REPLICATE_TOKEN=
```

4. Run the app

```sh
npm start
```
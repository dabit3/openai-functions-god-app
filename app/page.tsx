'use client'
import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [image, setImage] = useState('')
  const [audio, setAudio] = useState('')
  const [video, setVideo] = useState('')
  const [text, setText] = useState('')
  async function callApi() {
    try {
      if (!input) return
      setImage('')
      setAudio('')
      setVideo('')
      setText('')
      const response = await fetch('/api/gpt', {
        method: "POST",
        body: JSON.stringify({
          query: input
        })
      })
      const { data, type } = await response.json()
      console.log('data:', data)
      if (type === 'image') {
        setImage(data[0])
      }
      if (type === 'video') {
        setVideo(data[0])
      }
      if (type === 'audio') {
        setAudio(data)
      }
      if (type == 'text') {
        setText(data)
      }
    } catch (err) {
      console.log('error;', err)
    }
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <input
        className="text-black px-3 py-1 rounded"
        onChange={e => setInput(e.target.value)}
      />
      <button
        onClick={callApi}
        className="rounded-full bg-green-500 text-white py-3 px-14 mt-3 mb-4 cursor-pointer"
      >IMAGINE</button>
      {
        image && <img src={image} width="500px" />
      }
      {
        video && <video src={video} controls></video>
      }
      {
        text && <p>{text}</p>
      }
      {
        audio && (
          <audio controls>
            <source src={audio} type="audio/wav"></source>
          </audio>
        )
      }
    </main>
  )
}

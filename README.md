# useMediaDevice

## How to use it?

```jsx
function Camera() {
  const { takePhoto, videoRef } = useMediaDevice({ video: true, audio: false });
  const [img, setImg] = useState();

  return (
    <div>
      <video ref={videoRef}></video>
      <button onClick={() => setImg(takePhoto())}>Take Photo</button>
      <img src={img} alt="" />
    </div>
  );
}
```

### useMediaDevice parameter;

| parameter   | type    | default | description                                      |
| ----------- | ------- | ------- | ------------------------------------------------ |
| `autoStart` | boolean | `true`  | start media permissions when component is loaded |
| `audio`     | boolean | `true`  | microphone access                                |
| `video`     | boolean | `true`  | webcam access                                    |

> useMediaDevice also exports `media` which is `MediaStream` instance it let's you do anything with it

## Usage

Visit API Reference from [here](https://salmannotkhan.github.io/use-media-device)

## Contributing

Pull requests are always welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

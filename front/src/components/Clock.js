import useWebSocket from "react-use-websocket";

const api =
  "ws://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam";

function Clock() {
  const { clock } = useWebSocket(api, {
    share: true,
  });
  console.log({ clock });
  // <div>
  //   <text>{clock.hour}</text>
  //   <text>{clock.minute}</text>
  //   <text>{clock.seconds}</text>
  // </div>
}

export default Clock;

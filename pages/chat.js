import { useEffect, useRef, useState } from "react"
import { database } from "../firebase/init";
import { getDatabase, set, ref, onValue, update, push, child, get } from "firebase/database";

const roomData = [
  {
    roomId: "room1",
    createdDate: 20220119,
    classTimeStart: 202201201830,
    classTimeEnd: 202201201830,
    teacher: "takumi",
    student: "poyo",
  },
  {
    roomId: "room2",
    createdDate: 20220119,
    classTimeStart: 202201201830,
    classTimeEnd: 202201201830,
    teacher: "takumi",
    student: "poyo",
  },
]

const messages = [
  {
    roomId: "room1",
    msg: [
      { text: "hi" },
      { text: "hfdsi" },
      { text: "hfsdi" },
      { text: "hiv" },
    ]
  },
  {
    roomId: "room2",
    msg: [
      {
        from: "takumi",
        text: "hfdsi",
        time: 1642627159237,
        read: true,
      },
      {
        from: "poyo",
        text: "hi",
        time: 1642627159247,
        read: true,
      },
      {
        from: "takumi",
        text: "how are you",
        time: 1642627159257,
        read: false,
      },

    ]
  }
]

const user = "takumi"

function createNewRoom() {
  console.log("ok")
  const db = getDatabase();
  const newPostKey = push(child(ref(db), 'rooms')).key;
  const postData = {
    from: "userContext.userData.uid",
    text: "aaa",
    time: 1642627159257,
    read: false,
  }
  const updates = {};
  updates['/rooms/' + newPostKey] = postData;
  update(ref(db), updates);
  console.log("ok")

}

// function createNewRoom(userContext) {
//   const db = getDatabase();
//   const newPostKey = push(child(ref(db), 'rooms')).key;
//   const postData = {
//     createdDate: 20220119,
//     classTimeStart: 202201201830,
//     classTimeEnd: 202201201830,
//   }
//   const updates = {};
//   updates['/rooms/' + newPostKey] = postData;
//   update(ref(db), updates);

//   const postUserData = {
//     joinedRooms: newPostKey,
//   }
//   const updates2 = {};
//   updates2['/users/' + userContext.userData.uid + '/' + newPostKey] = newPostKey;
//   update(ref(db), updates2);
//   console.log("success")
// }

function createNewMsg(userContext, currentRoom) {

  const db = getDatabase();
  const newPostKey = push(child(ref(db), 'messages/' + currentRoom)).key;
  const postData = {
    from: userContext.userData.uid,
    text: "hello worldasdas",
    time: 1642627159257,
    read: false,
  }
  const updates = {};
  updates['/messages/' + currentRoom + '/' + newPostKey] = postData;
  update(ref(db), updates);

  const postUserData = {
    joinedRooms: newPostKey,
  }
  const updates2 = {};
  updates2['/users/' + userContext.userData.uid + '/' + newPostKey] = newPostKey;
  update(ref(db), updates2);
  console.log("success")
}

function readData(currentRoom, data, setData) {
  console.log("reading")
  const db = getDatabase();
  get(child(ref(db), `rooms`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log("fds")
      console.log(snapshot.val());
      setData(snapshot.val())
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  console.log(data)

}

function createNewUserDB() {

  const newPostKey = push(child(ref(db), 'users')).key;
  const postData = {
    joinedRooms: null,
  }
  const updates = {};
  updates['/users/' + userContext.userData.uid] = postData;
  return update(ref(db), updates);
}

function Chat() {
  const db = getDatabase();
  const currentRoom = "-MtoUzD4rbNRf7bdcl3-"
  const msgRef = child(ref(db), `messages/${currentRoom}`)
  const [msg, setMsg] = useState([])
  const [data, setData] = useState()
  const [room, setRoom] = useState()
  const [talkTo, setTalkTo] = useState()
  const msgEndRef = useRef()
  let newObj = []

  const scrollToBottom = () => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // useEffect(() => {
  //   scrollToBottom()
  // }, [msg]);

  const sendMessage = async (e) => {
    e.preventDefault()
    messages.room.msg.push(e.target.msg.value)
    e.target.msg.value = ""
  }



  return (

    <main className="flex w-full h-full">
      <section className="flex flex-col w-4/12 bg-gray-50  overflow-y-hidden border-r-2">
        <button onClick={() => { createNewRoom() }}>clidk</button>
        <button onClick={() => {

          for (let [key, value] of Object.entries(data)) {
            for (let [key2, value2] of Object.entries(value)) {
              console.log(`${key2}: ${value2}`);
              setMsg(value)

            }
          }

          console.log("fds")
          console.log(data)

        }}>clidk</button>
        <button onClick={() => { createNewMsg() }}>cmessage</button>
        <button onClick={() => { readData(currentRoom, data, setData) }}>rmessage</button>
        <ul className="">
          {roomData.map((item) => (
            <li className={`py-5 border-b px-3 transition hover:bg-indigo-100 ${item.roomId == room && "bg-indigo-200"} `}>
              <button
                onClick={() => { setRoom(item.roomId); }}
                className="w-full h-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{item.teacher == user ? item.student : item.teacher}</h3>
                  <p className="text-md text-gray-400">23m ago</p>
                </div>
                <div className="text-left text-md italic text-gray-400">
                  You have been invited!
                </div>
              </button>
            </li>))}
        </ul>
      </section>



      {roomData.map((item) => (
        <div className={`flex-1 w-8/12 h-full py-3 pl-3 justify-between flex flex-col m-0 ${item.roomId == room ? "" : "hidden"}`}>
          <div className="flex sm:items-center justify-between border-b-2 pb-2 border-gray-200">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"

                className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
              />
              <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                  <span className="text-gray-700 mr-3">{item.roomId == room ? item.teacher == user ? item.student : item.teacher : "no user"}</span>
                  <span className="text-green-500">
                    <svg width={10} height={10}>
                      <circle cx={5} cy={5} r={5} fill="currentColor" />
                    </svg>
                  </span>
                </div>
                <span className="text-lg text-gray-600">Junior Developer</span>
              </div>
            </div>
          </div>
          <div
            id="messages"
            className=" flex h-full flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            <div className="chat-message">
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                      dfs
                    </span>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                  alt="My profile"
                  className="w-6 h-6 rounded-full order-2"
                />
              </div>
            </div>

            {messages.map((data) => (
              data.roomId == room ?
                data.msg.map((msg) => (
                  <Message data={msg} />
                ))
                :
                ""
            ))}
            <div ref={msgEndRef}></div>
          </div>

          {/* chat component */}
          <form onSubmit={sendMessage}>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <div className="relative flex">
                <span className="absolute inset-y-0 flex items-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </button>
                </span>
                <input
                  id="msg"
                  required
                  type="text"
                  placeholder="Aa"
                  autoComplete="off"
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
                />
                <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 transform rotate-90"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ))}

      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n.scrollbar-w-2::-webkit-scrollbar {\n  width: 0.25rem;\n  height: 0.25rem;\n}\n\n.scrollbar-track-blue-lighter::-webkit-scrollbar-track {\n  --bg-opacity: 1;\n  background-color: #f7fafc;\n  background-color: rgba(247, 250, 252, var(--bg-opacity));\n}\n\n.scrollbar-thumb-blue::-webkit-scrollbar-thumb {\n  --bg-opacity: 1;\n  background-color: #edf2f7;\n  background-color: rgba(237, 242, 247, var(--bg-opacity));\n}\n\n.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {\n  border-radius: 0.25rem;\n}\n"
        }}
      />
    </main>


  )
}

function convertTime(timestamp) {
  let result = ""
  let d = new Date(timestamp)
  result += (d.getMonth() + 1) + "/" + d.getDate() + " " + (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes())

  return result;
}

function Message({ data }) {

  const isUserMessage = data.from == user ? true : false


  const time = convertTime(data.time)

  return (
    <div className="chat-message">
      <div className={`flex items-end ${isUserMessage && "justify-end"}`}>
        <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${isUserMessage ? "order-1 items-end text-right" : "order-2 items-start"} `}>
          <div>
            <span className={`${isUserMessage ? "px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white " : "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"}`}>
              {data.text}
            </span>
            <p className="text-slate-400 text-right">{isUserMessage ? data.read ? "✔️" : "" : ""} {time}</p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
          alt="profile"
          className={`w-6 h-6 rounded-full ${isUserMessage ? "hidden" : ""} items-end`}
        />
      </div>
    </div>
  )
}

export default Chat

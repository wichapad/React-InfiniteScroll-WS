import "./App.css";
import { useEffect, useState } from "react";
import PhotoCompo from "./Components/photoCompo";

function App() {
  const apiKey = `QTo24r7C74uJypJOP8rLodxGgS-m4ba6B_9lxOJPV7k`;
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); //เช็คว่าตอนนี้เรากำลัง load ข้อมูลใหม่จาก API มาใช้งาน อย่าเพิ่งส่งคำขอไปรัวๆ

  const fetchImage = async () => {
    setIsLoading(true);
    try {
      const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPhotos((oldData)=>{
        return [...oldData,...data] //นำเอาข้อมูลเดิมมาต่อกับข้อมูลใหม่
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    //ดึงข้อมููลรูปภาพ
    fetchImage();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    //ดักจับ event ที่เกี่ยวกับการ scroll หน้าจอที่อยู่ในแอพ
    const event = window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >
          document.body.offsetHeight - 500 &&
        !isLoading
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event); //ยกเลิกการสกอร์
    // eslint-disable-next-line
  }, []);
  return (
    <main>
      <h1>Infinit Scroll API</h1>
      <section className="photos">
        <div className="displayPhoto">
          {photos.map((data, index) => {
            return <PhotoCompo key={index} {...data} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default App;

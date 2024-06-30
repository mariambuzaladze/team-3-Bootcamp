import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { dataContext } from "../App";

export default function GoBack() {
  const navigate = useNavigate();
  const { data, setData } = useContext(dataContext);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      onClick={() => {
        setData({
          general: {},
          experience: [
            {
              position: "",
              employer: "",
              started_at: "",
              ended_at: "",
              description: "",
            },
          ],
          education: [
            {
              school: "",
              degree: "",
              graduation_date: "",
              description: "",
            },
          ],
        });
        navigate("/");
        localStorage.setItem("useSend", true);
      }}
    >
      <circle cx="20" cy="20" r="20" fill="white" />
      <path
        d="M22.8577 12.3522C23.0832 12.5778 23.2099 12.8837 23.2099 13.2026C23.2099 13.5216 23.0832 13.8275 22.8577 14.053L16.9035 20.0073L22.8577 25.9615C23.0768 26.1883 23.198 26.4922 23.1953 26.8076C23.1926 27.123 23.0661 27.4247 22.843 27.6477C22.62 27.8707 22.3183 27.9972 22.0029 28C21.6875 28.0027 21.3837 27.8815 21.1568 27.6623L14.3522 20.8577C14.1267 20.6321 14 20.3262 14 20.0073C14 19.6883 14.1267 19.3824 14.3522 19.1568L21.1568 12.3522C21.3824 12.1267 21.6883 12 22.0073 12C22.3262 12 22.6321 12.1267 22.8577 12.3522Z"
        fill="#2E2E2E"
      />
    </svg>
  );
}

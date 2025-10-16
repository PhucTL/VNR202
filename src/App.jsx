// PuzzleUnlock.jsx
import React, { useEffect, useState, useRef } from "react";

const IMAGE_URL ="https://bcp.cdnchinhphu.vn/thumb_w/777/334894974524682240/2025/6/30/tphcm-1-1751245519173693919081.jpg";
const VIDEO_URLS = [
  "https://yourdomain.com/videos/v1.mp4",
  "https://yourdomain.com/videos/v2.mp4",
  "https://yourdomain.com/videos/v3.mp4",
  "https://yourdomain.com/videos/v4.mp4",
  "https://yourdomain.com/videos/v5.mp4",
  "https://yourdomain.com/videos/v6.mp4",
];

const STORAGE_KEY = "puzzle_unlocked_v1";

const fakeApi = {
  loadStatus: async (userId) => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : Array(6).fill(false);
  },
  unlockPiece: async (userId, pieceIndex) => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : Array(6).fill(false);
    arr[pieceIndex] = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    return { ok: true, unlocked: arr };
  },
};

function PuzzleUnlock({ userId = "anon" }) {
  const [unlocked, setUnlocked] = useState(Array(6).fill(false));
  const [loading, setLoading] = useState(true);

  const [activePiece, setActivePiece] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const status = await fakeApi.loadStatus(userId);
      setUnlocked(status);
      setLoading(false);
    })();
  }, [userId]);

  const cols = 3;
  const rows = 2;

  const openPiece = (i) => {
    if (unlocked[i]) return;
    setActivePiece(i);
    setVideoEnded(false);
    setShowQuiz(false);
    setQuizAnswer("");
    setTimeout(() => videoRef.current && videoRef.current.play().catch(() => {}), 100);
  };

  const handleVideoEnded = () => {
    setVideoEnded(true);
    setShowQuiz(true);
  };

  const submitQuiz = async () => {
    const correct = quizAnswer.trim().toUpperCase() === "A";
    if (correct) {
      const resp = await fakeApi.unlockPiece(userId, activePiece);
      if (resp.ok) {
        setUnlocked(resp.unlocked);
        closeModal();
      } else alert("Unlock failed. Try again.");
    } else alert("Trả lời sai. Hãy thử lại.");
  };

  const closeModal = () => {
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {}
    }
    setActivePiece(null);
    setShowQuiz(false);
    setVideoEnded(false);
    setQuizAnswer("");
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "16px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ fontWeight: 700, marginBottom: 12 }}>
        Ảnh ghép 6 mảnh — Xem video + Quiz để mở
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: "6px",
          aspectRatio: "3 / 2",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => {
          const isUnlocked = unlocked[i];
          const xPos = (i % cols) * (-100 / (cols - 1));
          const yPos = Math.floor(i / cols) * (-100 / (rows - 1));

          return (
            <div
              key={i}
              onClick={() => openPiece(i)}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                overflow: "hidden",
                cursor: isUnlocked ? "default" : "pointer",
                backgroundImage: `url(${IMAGE_URL})`,
                backgroundSize: `${cols * 100}% ${rows * 100}%`,
                backgroundPosition: `${xPos}% ${yPos}%`,
                filter: isUnlocked ? "none" : "blur(5px) brightness(0.6)",
                transition: "filter 0.3s ease",
              }}
            >
              {!isUnlocked && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.4)",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 700 }}>
                    Mảnh {i + 1}
                  </div>
                  <div style={{ marginTop: 6, fontSize: 13 }}>
                    Xem video & trả lời quiz để mở
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openPiece(i);
                    }}
                    style={{
                      marginTop: 10,
                      padding: "8px 12px",
                      borderRadius: 6,
                      border: "none",
                      background: "#ffd166",
                      color: "#222",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Mở
                  </button>
                </div>
              )}

              {isUnlocked && (
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "rgba(255,255,255,0.9)",
                    color: "#111",
                    padding: "4px 8px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  MỞ
                </div>
              )}
            </div>
          );
        })}
      </div>

      {activePiece !== null && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(900px, 96vw)",
              background: "#fff",
              borderRadius: 8,
              padding: 16,
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <h3 style={{ marginBottom: 10 }}>
              Video mảnh {activePiece + 1}
            </h3>
            <video
              ref={videoRef}
              controls
              onEnded={handleVideoEnded}
              style={{
                width: "100%",
                borderRadius: 6,
                background: "#000",
              }}
            >
              <source src={VIDEO_URLS[activePiece]} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>

            {!videoEnded && (
              <div style={{ marginTop: 12, color: "#555" }}>
                Hãy xem hết video. Quiz sẽ xuất hiện khi video kết thúc.
              </div>
            )}

            {showQuiz && (
              <div style={{ marginTop: 16 }}>
                <h4 style={{ marginBottom: 8 }}>
                  Quiz — Mảnh {activePiece + 1}
                </h4>
                <div style={{ marginBottom: 8 }}>
                  Câu hỏi: Nội dung video nói về điều gì? (Đáp án đúng trong demo là "A")
                </div>
                <input
                  value={quizAnswer}
                  onChange={(e) => setQuizAnswer(e.target.value)}
                  placeholder="Nhập đáp án (ví dụ: A/B/C...)"
                  style={{
                    padding: "8px 10px",
                    width: "100%",
                    boxSizing: "border-box",
                    borderRadius: 6,
                    border: "1px solid #ddd",
                  }}
                />
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button
                    onClick={submitQuiz}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 6,
                      border: "none",
                      background: "#06c",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Nộp
                  </button>
                  <button
                    onClick={closeModal}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 6,
                      border: "1px solid #ddd",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PuzzleUnlock;

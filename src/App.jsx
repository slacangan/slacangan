import React, { useState } from "react";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [entries, setEntries] = useState([]);
  const [breathCount, setBreathCount] = useState(0);
  const [meditationCount, setMeditationCount] = useState(0);
  const [reflection, setReflection] = useState({
    trigger: "",
    story: "",
    body: "",
    truth: "",
    grounding: "",
    gratitude: ""
  });

  const resetReflection = () => {
    setReflection({
      trigger: "",
      story: "",
      body: "",
      truth: "",
      grounding: "",
      gratitude: ""
    });
  };

  const saveReflection = () => {
    const hasText = Object.values(reflection).some((value) => value.trim() !== "");
    if (!hasText) return;
    setEntries([{ ...reflection, id: Date.now() }, ...entries]);
    resetReflection();
    setScreen("home");
  };

  return (
    <div style={styles.page}>
      <div style={styles.phone}>
        {screen === "home" && <HomeScreen setScreen={setScreen} />}

        {screen === "reflect" && (
          <ReflectScreen
            reflection={reflection}
            setReflection={setReflection}
            saveReflection={saveReflection}
            setScreen={setScreen}
          />
        )}

        {screen === "breathwork" && (
          <BreathworkScreen
            setScreen={setScreen}
            breathCount={breathCount}
            setBreathCount={setBreathCount}
          />
        )}

        {screen === "meditation" && (
          <MeditationScreen
            setScreen={setScreen}
            meditationCount={meditationCount}
            setMeditationCount={setMeditationCount}
          />
        )}

        {screen === "nourish" && <NourishScreen />}
        {screen === "circle" && <CircleScreen />}

        {screen === "profile" && (
          <ProfileScreen
            entries={entries}
            breathCount={breathCount}
            meditationCount={meditationCount}
          />
        )}

        {screen !== "reflect" && screen !== "breathwork" && screen !== "meditation" && (
          <Navigation screen={screen} setScreen={setScreen} />
        )}
      </div>
    </div>
  );
}

function Navigation({ screen, setScreen }) {
  return (
    <div style={styles.nav}>
      <button style={screen === "home" ? styles.activeNavButton : styles.navButton} onClick={() => setScreen("home")}>Home</button>
      <button style={screen === "nourish" ? styles.activeNavButton : styles.navButton} onClick={() => setScreen("nourish")}>Nourish</button>
      <button style={screen === "circle" ? styles.activeNavButton : styles.navButton} onClick={() => setScreen("circle")}>Circle</button>
      <button style={screen === "profile" ? styles.activeNavButton : styles.navButton} onClick={() => setScreen("profile")}>Profile</button>
    </div>
  );
}

function HomeScreen({ setScreen }) {
  return (
    <div style={styles.content}>
      <p style={styles.eyebrow}>Curious and Rooted</p>
      <h1 style={styles.title}>I’m really glad you’re here</h1>
      <p style={styles.subtitle}>A space to pause, soften, and come back to yourself.</p>

      <div style={styles.reflectCard}>
        <p style={styles.label}>Go inward</p>
        <p style={styles.cardText}>There might be something here asking for your attention. Move through what you're feeling, gently and in your own time.</p>
        <button style={styles.primaryButton} onClick={() => setScreen("reflect")}>Let’s reflect</button>
      </div>

      <div style={styles.cardTight}>
        <p style={styles.label}>Breathwork</p>
        <h3 style={styles.cardTitle}>A small breath reset</h3>
        <p style={styles.cardText}>Take a few slow breaths and let your body know you are here.</p>
        <div style={styles.actionSpace}>
          <button style={styles.secondaryButton} onClick={() => setScreen("breathwork")}>Start</button>
        </div>
      </div>

      <div style={styles.cardTight}>
        <p style={styles.label}>Meditation</p>
        <h3 style={styles.cardTitle}>A quiet moment</h3>
        <p style={styles.cardText}>Close your eyes, notice your breath, and soften into what is present.</p>
        <div style={styles.actionSpace}>
          <button style={styles.secondaryButton} onClick={() => setScreen("meditation")}>Start</button>
        </div>
      </div>
    </div>
  );
}

function ReflectScreen({ reflection, setReflection, saveReflection, setScreen }) {
  const prompts = [
    { key: "trigger", label: "What stirred something in you?" },
    { key: "story", label: "What story is your mind telling?" },
    { key: "body", label: "Where do you feel this in your body?" },
    { key: "truth", label: "What feels true for you right now?" },
    { key: "grounding", label: "What might help you feel a little more grounded?" },
    { key: "gratitude", label: "Is there a small win or something you can appreciate?" }
  ];

  const [step, setStep] = useState(0);
  const currentPrompt = prompts[step];

  const handleContinue = () => {
    if (step < prompts.length - 1) {
      setStep(step + 1);
    } else {
      saveReflection();
    }
  };

  return (
    <div style={styles.content}>
      <button style={styles.secondaryButton} onClick={() => setScreen("home")}>Back home</button>
      <p style={styles.eyebrow}>{step + 1} of {prompts.length}</p>
      <h1 style={styles.title}>Take a moment with yourself</h1>
      <p style={styles.subtitle}>There’s no rush here. Just move gently, one step at a time.</p>

      <div style={styles.guidedCard}>
        <label style={styles.inputLabel}>{currentPrompt.label}</label>
        <textarea
          style={styles.largeTextarea}
          value={reflection[currentPrompt.key]}
          onChange={(event) => setReflection({ ...reflection, [currentPrompt.key]: event.target.value })}
          placeholder="Write what feels true here..."
        />
      </div>

      <div style={styles.buttonRow}>
        {step > 0 && (
          <button
            style={{ ...styles.primaryButton, flex: 1, background: "#587858" }}
            onClick={() => setStep(step - 1)}
          >
            Back
          </button>
        )}
        <button
          style={{ ...styles.primaryButton, flex: 1 }}
          onClick={handleContinue}
        >
          {step === prompts.length - 1 ? "Save reflection" : "Continue"}
        </button>
      </div>
    </div>
  );
}

function BreathworkScreen({ setScreen, breathCount, setBreathCount }) {
  return (
    <div style={styles.content}>
      <button style={styles.secondaryButton} onClick={() => setScreen("home")}>Back home</button>
      <h1 style={styles.title}>Breathwork</h1>
      <p style={styles.subtitle}>Follow along and let your breath guide you.</p>
      <div style={styles.cardTight}>
        <iframe
          width="100%"
          height="200"
          src="https://www.youtube.com/embed/SEfs5TJZ6Nk"
          title="Breathwork"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: 12 }}
        />
      </div>
      <div style={styles.actionSpace}>
        <button style={styles.primaryButton} onClick={() => { setBreathCount(breathCount + 1); setScreen("home"); }}>Done</button>
      </div>
    </div>
  );
}

function MeditationScreen({ setScreen, meditationCount, setMeditationCount }) {
  return (
    <div style={styles.content}>
      <button style={styles.secondaryButton} onClick={() => setScreen("home")}>Back home</button>
      <h1 style={styles.title}>Meditation</h1>
      <p style={styles.subtitle}>A gentle space to sit with yourself.</p>
      <div style={styles.cardTight}>
        <iframe
          width="100%"
          height="200"
          src="https://www.youtube.com/embed/inpok4MKVLM"
          title="Meditation"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: 12 }}
        />
      </div>
      <div style={styles.actionSpace}>
        <button style={styles.primaryButton} onClick={() => { setMeditationCount(meditationCount + 1); setScreen("home"); }}>Done</button>
      </div>
    </div>
  );
}

function NourishScreen() {
  const states = [
    {
      key: "overwhelmed",
      title: "I feel overwhelmed",
      support: "Let’s slow this down, just for a moment.",
      practice: "Place one hand on your chest and take 3 slow breaths.",
      video: "https://www.youtube.com/embed/SEfs5TJZ6Nk"
    },
    {
      key: "mind",
      title: "My mind won’t stop",
      support: "You don’t need to quiet everything. Just notice.",
      practice: "Close your eyes and gently name 3 thoughts without judging them.",
      video: "https://www.youtube.com/embed/inpok4MKVLM"
    },
    {
      key: "disconnected",
      title: "I feel disconnected",
      support: "Let’s come back into your body.",
      practice: "Press your feet into the ground and notice what you feel.",
      video: "https://www.youtube.com/embed/inpok4MKVLM"
    },
    {
      key: "reset",
      title: "I need a reset",
      support: "You can begin again right here.",
      practice: "Pause for a moment and take one full, slow breath in and out.",
      video: "https://www.youtube.com/embed/SEfs5TJZ6Nk"
    }
  ];

  const [selected, setSelected] = useState(null);

  if (!selected) {
    return (
      <div style={styles.content}>
        <h1 style={styles.title}>Nourish</h1>
        <p style={styles.subtitle}>Where are you right now?</p>
        {states.map((item) => (
          <button key={item.key} style={styles.topicCard} onClick={() => setSelected(item)}>
            <p style={styles.cardText}>{item.title}</p>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div style={styles.content}>
      <button style={styles.secondaryButton} onClick={() => setSelected(null)}>Back</button>
      <h1 style={styles.title}>{selected.title}</h1>
      <p style={styles.subtitle}>{selected.support}</p>

      <div style={styles.cardTight}>
        <p style={styles.label}>Try this</p>
        <p style={styles.cardText}>{selected.practice}</p>
      </div>

      <div style={styles.cardTight}>
        <p style={styles.label}>If you want to follow along</p>
        <iframe
          width="100%"
          height="200"
          src={selected.video}
          title="Support"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: 12 }}
        />
      </div>
    </div>
  );
}

function CircleScreen() {
  const topics = [
    {
      title: "Right now",
      description: "Share what you are currently moving through.",
      posts: [
        { id: "right-1", user: "Maya", text: "Feeling a little overwhelmed today.", heart: 4, star: 1, pray: 2 },
        { id: "right-2", user: "Alex", text: "Trying to slow down instead of reacting.", heart: 3, star: 2, pray: 6 }
      ]
    },
    {
      title: "A small win",
      description: "Share a moment you are proud of, even if it feels tiny.",
      posts: [
        { id: "win-1", user: "Jules", text: "I paused before responding.", heart: 5, star: 8, pray: 1 },
        { id: "win-2", user: "Sam", text: "I chose rest instead of pushing.", heart: 5, star: 2, pray: 2 }
      ]
    },
    {
      title: "Coming back to yourself",
      description: "Share what is helping you feel a little more grounded.",
      posts: [
        { id: "ground-1", user: "Nina", text: "Breathing slowly helped me today.", heart: 3, star: 1, pray: 7 },
        { id: "ground-2", user: "Kai", text: "Went for a walk without my phone.", heart: 2, star: 3, pray: 1 }
      ]
    }
  ];

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  const openTopic = (topic) => {
    setSelectedTopic(topic);
    setPosts(topic.posts);
  };

  const addPost = () => {
    if (!input.trim()) return;
    setPosts([{ id: Date.now(), user: "You", text: input, heart: 0, star: 0, pray: 0 }, ...posts]);
    setInput("");
  };

  const react = (id, type) => {
    setPosts(posts.map((post) => {
      if (post.id !== id) return post;
      return { ...post, [type]: post[type] + 1 };
    }));
  };

  if (!selectedTopic) {
    return (
      <div style={styles.content}>
        <h1 style={styles.title}>Circle</h1>
        <p style={styles.subtitle}>You don’t have to hold it alone. Choose a space to share.</p>
        {topics.map((topic) => (
          <button key={topic.title} style={styles.topicCard} onClick={() => openTopic(topic)}>
            <p style={styles.label}>{topic.title}</p>
            <p style={styles.cardText}>{topic.description}</p>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div style={styles.content}>
      <button style={styles.secondaryButton} onClick={() => setSelectedTopic(null)}>Back to Circle</button>
      <h1 style={styles.title}>{selectedTopic.title}</h1>
      <p style={styles.subtitle}>{selectedTopic.description}</p>

      <div style={styles.cardTight}>
        <textarea
          style={styles.textarea}
          placeholder="Share something gently..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <div style={styles.actionSpace}>
          <button style={styles.primaryButton} onClick={addPost}>Post</button>
        </div>
      </div>

      {posts.map((post) => (
        <div key={post.id} style={styles.commentCard}>
          <p style={styles.userName}>{post.user}</p>
          <p style={styles.cardText}>{post.text}</p>
          <div style={styles.reactionRow}>
            <button style={styles.tinyButton} onClick={() => react(post.id, "heart")}>🤍 {post.heart}</button>
            <button style={styles.tinyButton} onClick={() => react(post.id, "star")}>✨ {post.star}</button>
            <button style={styles.tinyButton} onClick={() => react(post.id, "pray")}>🙏 {post.pray}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileScreen({ entries, breathCount, meditationCount }) {
  return (
    <div style={styles.content}>
      <h1 style={styles.title}>Stay curious, stay rooted</h1>
      <p style={styles.subtitle}>A quiet reflection of how you’ve been showing up.</p>
      <div style={styles.statCard}>Reflections: {entries.length}</div>
      <div style={styles.statCard}>Meditations: {meditationCount}</div>
      <div style={styles.statCard}>Breathwork: {breathCount}</div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3efe8",
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif'
  },
  phone: {
    width: "100%",
    maxWidth: 420,
    minHeight: "100vh",
    background: "#f8f5ef",
    borderRadius: 0,
    padding: 18,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    overflowY: "auto",
    position: "relative"
  },
  content: {
    padding: "34px 18px 120px"
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.2,
    textTransform: "uppercase",
    color: "#526352",
    marginBottom: 12
  },
  title: {
    fontSize: 30,
    lineHeight: 1.15,
    marginBottom: 16,
    color: "#2f3b32"
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "#4f5d52",
    marginBottom: 26
  },
  primaryButton: {
    width: "100%",
    padding: 15,
    borderRadius: 18,
    border: "none",
    background: "#4f6f4f",
    color: "white",
    fontSize: 15,
    fontWeight: 600,
    marginTop: 18,
    marginBottom: 4,
    cursor: "pointer",
    minHeight: 48
  },
  secondaryButton: {
    width: "100%",
    padding: 13,
    borderRadius: 16,
    border: "1px solid #4f6f4f",
    background: "transparent",
    color: "#4f6f4f",
    fontSize: 14,
    marginBottom: 18,
    cursor: "pointer",
    minHeight: 48
  },
  cardTight: {
    padding: 20,
    paddingBottom: 12,
    borderRadius: 24,
    background: "white",
    marginBottom: 18,
    boxShadow: "0 6px 14px rgba(0,0,0,0.07)"
  },
  guidedCard: {
    padding: 22,
    paddingBottom: 12,
    borderRadius: 26,
    background: "white",
    marginBottom: 20,
    boxShadow: "0 8px 18px rgba(0,0,0,0.08)"
  },
  topicCard: {
    width: "100%",
    textAlign: "left",
    padding: 20,
    paddingBottom: 12,
    borderRadius: 24,
    border: "none",
    background: "white",
    marginBottom: 18,
    boxShadow: "0 6px 14px rgba(0,0,0,0.07)",
    cursor: "pointer"
  },
  reflectCard: {
    padding: 22,
    borderRadius: 28,
    background: "#e9e3d8",
    marginBottom: 22,
    boxShadow: "0 8px 18px rgba(0,0,0,0.08)"
  },
  actionSpace: {
    marginTop: 12
  },
  label: {
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    color: "#526352",
    marginBottom: 9
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 8,
    color: "#2f3b32"
  },
  cardText: {
    fontSize: 14,
    lineHeight: 1.65,
    color: "#4f5d52"
  },
  inputLabel: {
    fontSize: 17,
    lineHeight: 1.4,
    marginBottom: 12,
    display: "block",
    color: "#2f3b32",
    fontWeight: 600
  },
  textarea: {
    width: "100%",
    minHeight: 76,
    borderRadius: 14,
    border: "1px solid #9f9587",
    padding: 10,
    fontSize: 14,
    outline: "none",
    background: "#f9fdfb",
    boxSizing: "border-box"
  },
  largeTextarea: {
    width: "100%",
    minHeight: 200,
    borderRadius: 18,
    border: "1px solid #9f9587",
    padding: 16,
    fontSize: 15,
    outline: "none",
    background: "#f9fdfb",
    boxSizing: "border-box",
    resize: "vertical"
  },
  buttonRow: {
    display: "flex",
    gap: 10,
    marginTop: 12,
    alignItems: "stretch"
  },
  nav: {
    position: "sticky",
    bottom: 12,
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 8,
    background: "white",
    padding: 12,
    borderRadius: 24,
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)"
  },
  navButton: {
    padding: "11px 6px",
    background: "transparent",
    border: "none",
    color: "#526352",
    fontWeight: 500,
    cursor: "pointer"
  },
  activeNavButton: {
    padding: "11px 6px",
    background: "#4f6f4f",
    border: "none",
    color: "white",
    borderRadius: 14,
    fontWeight: 600,
    cursor: "pointer",
    minHeight: 44
  },
  statCard: {
    padding: 20,
    paddingBottom: 12,
    borderRadius: 22,
    background: "white",
    marginBottom: 12,
    textAlign: "center",
    fontSize: 15,
    boxShadow: "0 6px 14px rgba(0,0,0,0.07)"
  },
  commentCard: {
    padding: 20,
    borderRadius: 24,
    background: "white",
    marginBottom: 18,
    boxShadow: "0 6px 14px rgba(0,0,0,0.07)"
  },
  userName: {
    margin: "0 0 8px",
    fontSize: 13,
    fontWeight: 700,
    color: "#2f3b32"
  },
  reactionRow: {
    display: "flex",
    gap: 8,
    marginTop: 12
  },
  tinyButton: {
    border: "none",
    background: "#f3efe8",
    color: "#4f6f4f",
    borderRadius: 999,
    padding: "7px 10px",
    cursor: "pointer",
    minHeight: 44
  }
};

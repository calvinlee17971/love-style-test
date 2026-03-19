import { useState } from 'react'
import './App.css'

type AxisCode = 'A' | 'S' | 'L' | 'F'
type Screen = 'intro' | 'quiz' | 'result'

type Question = {
  id: number
  axis: AxisCode
  prompt: string
  options: string[]
}

type AxisMeta = {
  axis: AxisCode
  label: string
  leftCode: string
  leftLabel: string
  rightCode: string
  rightLabel: string
}

type ResultType = {
  code: string
  emoji: string
  title: string
  traits: string
  description: string
}

const axisMetaList: AxisMeta[] = [
  {
    axis: 'A',
    label: '애정 표현',
    leftCode: 'E',
    leftLabel: 'Expressive (표현형)',
    rightCode: 'R',
    rightLabel: 'Reserved (절제형)',
  },
  {
    axis: 'S',
    label: '안정성',
    leftCode: 'S',
    leftLabel: 'Stable (안정형)',
    rightCode: 'N',
    rightLabel: 'Nervous (불안형)',
  },
  {
    axis: 'L',
    label: '주도성',
    leftCode: 'L',
    leftLabel: 'Leader (주도형)',
    rightCode: 'F',
    rightLabel: 'Follower (수동형)',
  },
  {
    axis: 'F',
    label: '자유도',
    leftCode: 'C',
    leftLabel: 'Close (밀착형)',
    rightCode: 'I',
    rightLabel: 'Independent (자유형)',
  },
]

const questions: Question[] = [
  {
    id: 1,
    axis: 'A',
    prompt: '연인이 하루 종일 연락이 없다가 밤에야 답장이 왔다. 너의 반응은?',
    options: [
      '바로 "왜 이제 연락해?"라고 묻는다',
      '아무 일 없는 척 대화를 이어간다',
      '필요한 말만 하고 대화를 줄인다',
      '굳이 답장하지 않는다',
    ],
  },
  {
    id: 2,
    axis: 'A',
    prompt: '데이트가 끝나고 집에 돌아왔다. 보통 너는?',
    options: [
      '"오늘 너무 좋았어"라고 먼저 연락한다',
      '잘 들어갔냐 정도만 보낸다',
      '상대가 먼저 연락하면 답한다',
      '따로 연락하지 않는다',
    ],
  },
  {
    id: 3,
    axis: 'A',
    prompt: '상대가 "나 좋아해?"라고 물었다. 너의 반응은?',
    options: [
      '"당연하지, 많이 좋아해"라고 바로 말한다',
      '웃으면서 애매하게 표현한다',
      '대답을 돌리거나 농담으로 넘긴다',
      '그런 질문 자체가 부담스럽다',
    ],
  },
  {
    id: 4,
    axis: 'A',
    prompt: '연애 초반, 상대에게 호감이 생겼다. 너는?',
    options: [
      '티가 날 정도로 적극적으로 표현한다',
      '은근히 표현한다',
      '최대한 숨긴다',
      '절대 먼저 표현하지 않는다',
    ],
  },
  {
    id: 5,
    axis: 'S',
    prompt: '연인이 평소보다 답장이 느리고 짧다. 너는 어떻게 생각하나?',
    options: [
      '혹시 마음이 식었나 불안하다',
      '이유가 있는지 신경 쓰인다',
      '그냥 바쁜가 보다 생각한다',
      '별로 신경 쓰지 않는다',
    ],
  },
  {
    id: 6,
    axis: 'S',
    prompt: '연인과 갈등이 생겼다. 너의 스타일은?',
    options: [
      '바로 감정이 올라오고 표현한다',
      '빠르게 대화로 풀려고 한다',
      '생각 정리 후 이야기한다',
      '시간이 지나면 괜찮아진다',
    ],
  },
  {
    id: 7,
    axis: 'S',
    prompt: '연인이 다른 이성과 친하게 지낸다. 너는?',
    options: [
      '불안하고 계속 신경 쓰인다',
      '조금 신경 쓰이지만 티는 안 낸다',
      '어느 정도는 이해한다',
      '크게 신경 쓰지 않는다',
    ],
  },
  {
    id: 8,
    axis: 'S',
    prompt: '연애가 오래되었을 때 너는 어떤 편인가?',
    options: [
      '감정 기복이 커진다',
      '관계 유지에 노력한다',
      '자연스럽게 안정된다',
      '감정이 점점 줄어든다',
    ],
  },
  {
    id: 9,
    axis: 'L',
    prompt: '데이트 장소를 정할 때 너는?',
    options: [
      '내가 먼저 계획을 다 짠다',
      '같이 상의해서 정한다',
      '상대 의견을 따른다',
      '상대가 알아서 정해주길 바란다',
    ],
  },
  {
    id: 10,
    axis: 'L',
    prompt: '고백 상황이 왔다. 너는?',
    options: [
      '내가 먼저 고백한다',
      '분위기 보고 먼저 할 수도 있다',
      '상대가 하길 기다린다',
      '고백 자체를 피한다',
    ],
  },
  {
    id: 11,
    axis: 'L',
    prompt: '갈등 상황에서 너는?',
    options: [
      '먼저 대화를 이끈다',
      '서로 맞춰가려 한다',
      '상대가 먼저 말하길 기다린다',
      '그냥 피한다',
    ],
  },
  {
    id: 12,
    axis: 'L',
    prompt: '연애 전반적으로 너는 어떤 스타일인가?',
    options: [
      '관계를 내가 리드한다',
      '상황에 따라 번갈아 한다',
      '대부분 따라가는 편이다',
      '거의 수동적인 편이다',
    ],
  },
  {
    id: 13,
    axis: 'F',
    prompt: '연애 중 개인 시간은 너에게 어떤 의미인가?',
    options: [
      '거의 필요 없다',
      '조금 줄여도 괜찮다',
      '적당히 필요하다',
      '매우 중요하다',
    ],
  },
  {
    id: 14,
    axis: 'F',
    prompt: '연인과 연락 빈도에 대한 너의 선호는?',
    options: [
      '계속 이어지는 연락',
      '자주 연락',
      '적당한 간격',
      '최소한의 연락',
    ],
  },
  {
    id: 15,
    axis: 'F',
    prompt: '취미 생활은 어떻게 하는 편인가?',
    options: [
      '항상 같이 해야 한다',
      '같이 + 개인 둘 다',
      '각자 하는 것도 괜찮다',
      '완전히 따로 하는 게 좋다',
    ],
  },
  {
    id: 16,
    axis: 'F',
    prompt: '연애에서 거리감은 어떤 게 좋다고 생각하나?',
    options: [
      '항상 붙어 있는 게 좋다',
      '자주 보는 게 좋다',
      '적당한 거리가 좋다',
      '거리 유지가 중요하다',
    ],
  },
]

const resultTypes: ResultType[] = [
  {
    code: 'ESLC',
    emoji: '💥',
    title: '올인 리더형',
    traits: '표현 + 안정 + 주도 + 밀착',
    description: '사랑도 표현도 다 리드하는 타입. 가장 이상적인 연애형에 가까움.',
  },
  {
    code: 'ESFC',
    emoji: '❤️',
    title: '따뜻한 배려형',
    traits: '표현 + 안정 + 수동 + 밀착',
    description: '부드럽고 편안한 연애를 만드는 타입. 상대 중심으로 움직임.',
  },
  {
    code: 'ENLC',
    emoji: '🔥',
    title: '감정 몰입형',
    traits: '표현 + 불안 + 주도 + 밀착',
    description: '사랑에 올인하지만 감정 기복이 큼. 집착으로 보일 수 있음.',
  },
  {
    code: 'ENFC',
    emoji: '🌊',
    title: '감성 의존형',
    traits: '표현 + 불안 + 수동 + 밀착',
    description: '상대에게 많이 의지하는 타입. 혼자 있으면 불안함.',
  },
  {
    code: 'ESLI',
    emoji: '🌿',
    title: '자유로운 균형형',
    traits: '표현 + 안정 + 주도 + 자유',
    description: '연애도 하고 자유도 지키는 타입. 밸런스 좋은 스타일.',
  },
  {
    code: 'ESFI',
    emoji: '🕊',
    title: '감성 자유형',
    traits: '표현 + 안정 + 수동 + 자유',
    description: '편안하고 가벼운 연애 선호. 구속을 싫어함.',
  },
  {
    code: 'ENLI',
    emoji: '🎭',
    title: '밀당 리더형',
    traits: '표현 + 불안 + 주도 + 자유',
    description: '감정은 있지만 거리 조절을 잘함. 밀당 고수 스타일.',
  },
  {
    code: 'ENFI',
    emoji: '🌪',
    title: '감정 회피형',
    traits: '표현 + 불안 + 수동 + 자유',
    description: '감정은 있지만 피하려는 성향. 가까워지면 도망가는 타입.',
  },
  {
    code: 'RSLC',
    emoji: '🧠',
    title: '이성 리더형',
    traits: '절제 + 안정 + 주도 + 밀착',
    description: '감정보다 책임과 구조를 중시. 연애도 관리하는 스타일.',
  },
  {
    code: 'RSFC',
    emoji: '📊',
    title: '안정 지원형',
    traits: '절제 + 안정 + 수동 + 밀착',
    description: '조용히 오래 가는 타입. 겉으로 표현은 적음.',
  },
  {
    code: 'RNLC',
    emoji: '⚡',
    title: '통제 집착형',
    traits: '절제 + 불안 + 주도 + 밀착',
    description: '표현은 적지만 속은 불안. 컨트롤하려는 성향이 강함.',
  },
  {
    code: 'RNFC',
    emoji: '🧊',
    title: '감정 억제형',
    traits: '절제 + 불안 + 수동 + 밀착',
    description: '감정을 안 드러내서 오해받기 쉬운 타입.',
  },
  {
    code: 'RSLI',
    emoji: '🌬',
    title: '쿨 독립형',
    traits: '절제 + 안정 + 주도 + 자유',
    description: '가장 쿨한 스타일. 연애에 크게 흔들리지 않음.',
  },
  {
    code: 'RSFI',
    emoji: '🧘',
    title: '평온 거리형',
    traits: '절제 + 안정 + 수동 + 자유',
    description: '편안하고 부담 없는 연애. 자기 삶이 중요함.',
  },
  {
    code: 'RNLI',
    emoji: '🎯',
    title: '전략 거리형',
    traits: '절제 + 불안 + 주도 + 자유',
    description: '겉은 쿨하지만 속은 계산적. 거리 유지하면서 주도함.',
  },
  {
    code: 'RNFI',
    emoji: '🧩',
    title: '카멜레온형',
    traits: '절제 + 불안 + 수동 + 자유',
    description: '상황 따라 완전히 달라지는 타입. 예측하기 어려움.',
  },
]

const scoreMap = [2, 1, -1, -2]

function getResultCode(answers: Record<number, number>) {
  const axisScores: Record<AxisCode, number> = { A: 0, S: 0, L: 0, F: 0 }

  questions.forEach((question) => {
    const answerIndex = answers[question.id]
    if (answerIndex !== undefined) {
      axisScores[question.axis] += scoreMap[answerIndex]
    }
  })

  return axisMetaList
    .map((axisMeta) =>
      axisScores[axisMeta.axis] >= 0 ? axisMeta.leftCode : axisMeta.rightCode,
    )
    .join('')
}

function App() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [shareMessage, setShareMessage] = useState('')

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const resultCode = getResultCode(answers)
  const result =
    resultTypes.find((item) => item.code === resultCode) ?? resultTypes[0]

  const handleStart = () => {
    setAnswers({})
    setCurrentIndex(0)
    setShareMessage('')
    setScreen('quiz')
  }

  const handleSelect = (optionIndex: number) => {
    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: optionIndex,
    }

    setAnswers(nextAnswers)

    if (currentIndex === questions.length - 1) {
      setScreen('result')
      return
    }

    setCurrentIndex((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleRestart = () => {
    setAnswers({})
    setCurrentIndex(0)
    setShareMessage('')
    setScreen('intro')
  }

  const handleShare = async () => {
    const text = `내 연애 스타일은 ${result.code} ${result.title}! 너도 테스트해봐.`

    try {
      if (navigator.share) {
        await navigator.share({
          title: '연애 스타일 테스트',
          text,
          url: window.location.href,
        })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${text} ${window.location.href}`)
        setShareMessage('링크가 복사됐어요. SNS에 바로 붙여넣기 해보세요.')
        return
      }

      setShareMessage('공유가 준비됐어요. SNS에 바로 올려보세요.')
    } catch {
      setShareMessage('공유가 취소되었어요. 다시 시도해보세요.')
    }
  }

  if (screen === 'intro') {
    return (
      <main className="page-shell">
        <section className="hero-card intro-card">
          <p className="eyebrow">Love Style Test</p>
          <h1>내 연애 스타일은 어떤 타입일까?</h1>
          <p className="hero-lead">
            16개의 질문에 답하면 당신의 연애 성향을 4자리 코드로 분석해드려요.
            결과는 친구와 공유하기 좋게 한눈에 보여집니다.
          </p>

          <div className="intro-pills">
            <span>16문항</span>
            <span>4가지 축 분석</span>
            <span>16가지 결과</span>
          </div>

          <button className="primary-button" onClick={handleStart}>
            시작하기
          </button>
        </section>
      </main>
    )
  }

  if (screen === 'quiz') {
    return (
      <main className="page-shell">
        <section className="hero-card quiz-card">
          <div className="quiz-top">
            <div>
              <p className="eyebrow">Question {currentQuestion.id}</p>
              <h1>Q{currentQuestion.id}.</h1>
            </div>
            <button className="ghost-button" onClick={handleRestart}>
              처음으로
            </button>
          </div>

          <div className="progress-meta">
            <span>
              {currentIndex + 1} / {questions.length}
            </span>
            <span>{axisMetaList.find((item) => item.axis === currentQuestion.axis)?.label}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <article className="question-stage">
            <h2>{currentQuestion.prompt}</h2>
            <div className="answer-list">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option}
                  className="answer-button"
                  onClick={() => handleSelect(index)}
                >
                  <span className="answer-index">{index + 1}</span>
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </article>

          <div className="quiz-actions">
            <button
              className="secondary-button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              이전 질문
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="hero-card result-card-shell">
        <p className="eyebrow">Your Result</p>
        <h1>너의 연애 스타일은 이거다!</h1>

        <article className="result-highlight">
          <p className="result-emoji">{result.emoji}</p>
          <p className="result-code">{result.code}</p>
          <h2>{result.title}</h2>
          <p className="result-traits">{result.traits}</p>
          <p className="result-description">{result.description}</p>
        </article>

        <div className="result-actions">
          <button className="primary-button" onClick={handleShare}>
            SNS에 공유하기
          </button>
          <button className="secondary-button" onClick={handleRestart}>
            다시 테스트하기
          </button>
        </div>

        {shareMessage ? <p className="share-message">{shareMessage}</p> : null}
      </section>
    </main>
  )
}

export default App

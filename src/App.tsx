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
  summary: string
  traits: string
  personality: string
  datingStyle: string
  strengths: string[]
  weaknesses: string[]
  goodMatches: string[]
  badMatches: string[]
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
    summary: '사랑도, 관계도 직접 이끄는 타입',
    traits: '표현 + 안정 + 주도 + 밀착',
    personality:
      '이 유형은 감정 표현을 전혀 아끼지 않는다. 좋아하면 좋아한다고 말하고, 서운하면 바로 표현한다. 관계를 자연스럽게 주도하는 힘도 있어서 상대를 끌고 가는 경우가 많다. 감정과 행동이 일치하는 편이라 신뢰를 주지만, 그만큼 상대의 반응에도 민감하게 반응한다.',
    datingStyle:
      '연애를 하면 적극적으로 관계를 만들어간다. 데이트 계획, 분위기, 감정 흐름까지 전체적으로 리드하는 편이다. 상대에게 애정을 아낌없이 주고, 관계의 밀도를 높이려 한다.',
    strengths: ['표현이 솔직하고 확실함', '관계를 주도적으로 이끌 수 있음', '상대에게 안정감을 줌'],
    weaknesses: ['상대에게 부담이 될 수 있음', '감정 기복이 커질 수 있음', '주도권 집착으로 보일 수 있음'],
    goodMatches: ['ESFC', 'RSFC'],
    badMatches: ['RSLI', 'RNFI'],
  },
  {
    code: 'ESFC',
    emoji: '❤️',
    title: '따뜻한 배려형',
    summary: '상대를 편안하게 만드는 연애형',
    traits: '표현 + 안정 + 수동 + 밀착',
    personality:
      '이 유형은 감정 표현은 충분히 하지만, 상대를 압박하지 않는다. 관계를 부드럽게 유지하려고 하며, 상대의 감정 상태를 잘 읽는다. 갈등 상황에서도 감정적으로 치닫기보다는 자연스럽게 풀어내는 능력이 있다. 본인의 감정보다 상대의 편안함을 우선시하는 경우가 많다.',
    datingStyle:
      '서로 맞춰가는 연애를 선호한다. 상대가 부담을 느끼지 않도록 속도를 조절하고, 관계를 안정적으로 유지하려 한다. 감정 표현도 과하지 않게 조절한다.',
    strengths: ['배려심이 뛰어남', '갈등 관리 능력이 좋음', '편안한 관계 형성'],
    weaknesses: ['본인 감정을 숨길 수 있음', '주도권이 약할 수 있음', '답답하게 보일 수 있음'],
    goodMatches: ['ESLC', 'RSLC'],
    badMatches: ['ENLI', 'RSLI'],
  },
  {
    code: 'ENLC',
    emoji: '🔥',
    title: '감정 몰입형',
    summary: '사랑하면 전부를 거는 타입',
    traits: '표현 + 불안 + 주도 + 밀착',
    personality:
      '이 유형은 감정이 매우 강하게 작용한다. 좋아하면 빠르게 몰입하고, 관계의 중심이 연애가 된다. 하지만 동시에 불안감도 크기 때문에 상대의 작은 변화에도 크게 흔들린다. 감정의 폭이 크고 깊다.',
    datingStyle:
      '연애에 많은 시간과 에너지를 투자한다. 연락, 표현, 만남 모두 적극적이며 상대에게도 같은 수준을 기대한다.',
    strengths: ['진심이 깊다', '애정 표현이 풍부하다', '관계 몰입도가 높다'],
    weaknesses: ['감정 기복이 크다', '집착으로 보일 수 있음', '상대에게 부담이 될 수 있음'],
    goodMatches: ['ESFC', 'RSFC'],
    badMatches: ['RSLI', 'RNFI'],
  },
  {
    code: 'ENFC',
    emoji: '🌊',
    title: '감성 의존형',
    summary: '사랑받고 싶어하는 타입',
    traits: '표현 + 불안 + 수동 + 밀착',
    personality:
      '이 유형은 감정 표현도 하고 싶고, 안정도 원하지만 불안감이 쉽게 올라온다. 관계에서 상대의 존재가 큰 의미를 차지하며, 혼자 있는 시간을 힘들어하는 경우가 많다. 감정 의존도가 높은 편이다.',
    datingStyle:
      '상대에게 정서적으로 의지하는 경향이 있다. 자주 연락하고 감정 확인을 중요하게 생각한다.',
    strengths: ['감정 교류가 풍부함', '애정이 깊음', '따뜻한 분위기 형성'],
    weaknesses: ['의존성이 강함', '불안정한 감정 상태', '상대에게 부담 가능'],
    goodMatches: ['ESLC', 'ESFC'],
    badMatches: ['RSLI', 'RSFI'],
  },
  {
    code: 'ESLI',
    emoji: '🌿',
    title: '자유로운 균형형',
    summary: '연애와 개인 삶을 동시에 지키는 타입',
    traits: '표현 + 안정 + 주도 + 자유',
    personality:
      '이 유형은 감정 표현도 가능하고 안정감도 있으며, 동시에 자신의 삶도 중요하게 생각한다. 관계와 개인의 균형을 잘 맞추는 편이다.',
    datingStyle:
      '상대를 존중하면서도 본인의 삶을 유지한다. 과한 집착 없이 자연스러운 관계를 선호한다.',
    strengths: ['균형감각이 뛰어남', '감정이 안정적임', '성숙한 관계 형성'],
    weaknesses: ['감정이 덜 깊어 보일 수 있음', '거리감이 느껴질 수 있음', '열정 부족으로 보일 수 있음'],
    goodMatches: ['ESFC', 'RSFI'],
    badMatches: ['ENLC', 'ENFC'],
  },
  {
    code: 'ESFI',
    emoji: '🕊',
    title: '감성 자유형',
    summary: '편안함을 가장 중요하게 생각하는 타입',
    traits: '표현 + 안정 + 수동 + 자유',
    personality:
      '이 유형은 감정 표현은 있지만, 구속되는 관계는 부담스러워한다. 자연스럽고 가벼운 관계를 선호한다.',
    datingStyle:
      '억지로 관계를 유지하지 않고 자연스럽게 흐름을 따른다. 부담 없는 연애를 선호한다.',
    strengths: ['자연스러운 매력', '편안한 분위기', '긍정적인 에너지'],
    weaknesses: ['책임감 부족으로 보일 수 있음', '깊이가 부족해 보일 수 있음', '관계 지속력이 약할 수 있음'],
    goodMatches: ['ESLI', 'RSFI'],
    badMatches: ['ENLC', 'ESLC'],
  },
  {
    code: 'ENLI',
    emoji: '🎭',
    title: '밀당 리더형',
    summary: '감정과 거리 조절을 동시에 하는 타입',
    traits: '표현 + 불안 + 주도 + 자유',
    personality:
      '이 유형은 감정은 있지만, 일부러 거리 조절을 한다. 관계를 주도하면서도 상대를 완전히 가까이 두지 않는다. 감정과 전략을 동시에 사용하는 성향이다.',
    datingStyle:
      '밀당을 자연스럽게 사용하며 관계를 주도한다. 상대의 반응을 보면서 관계를 조절한다.',
    strengths: ['관계 조절 능력', '매력적인 긴장감 형성', '주도적인 관계 운영'],
    weaknesses: ['진정성이 의심될 수 있음', '상대가 지칠 수 있음', '신뢰 형성이 어려울 수 있음'],
    goodMatches: ['ESFI', 'RSFI'],
    badMatches: ['ENFC', 'ESFC'],
  },
  {
    code: 'ENFI',
    emoji: '🌪',
    title: '감정 회피형',
    summary: '가까워질수록 멀어지는 타입',
    traits: '표현 + 불안 + 수동 + 자유',
    personality:
      '감정은 있지만, 깊어지는 순간 부담을 느낀다. 그래서 관계가 가까워질수록 거리 두려는 행동을 보인다. 스스로도 감정을 통제하기 어려워한다.',
    datingStyle:
      '초반에는 잘 다가가지만, 관계가 깊어지면 갑자기 거리를 둔다.',
    strengths: ['자유로운 사고', '가벼운 관계 형성', '감정에 휘둘리지 않음'],
    weaknesses: ['일관성이 부족함', '상대에게 혼란을 줌', '깊은 관계 유지 어려움'],
    goodMatches: ['ESLI', 'RSFI'],
    badMatches: ['ENLC', 'ESLC'],
  },
  {
    code: 'RSLC',
    emoji: '🧠',
    title: '이성 리더형',
    summary: '감정보다 관계 구조를 보는 타입',
    traits: '절제 + 안정 + 주도 + 밀착',
    personality:
      '이 유형은 감정보다는 현실과 구조를 중요하게 생각한다. 관계를 논리적으로 바라보며 안정적으로 유지하려 한다.',
    datingStyle:
      '감정보다는 책임과 역할을 중시한다. 관계를 안정적으로 운영하려 한다.',
    strengths: ['책임감 있음', '안정적인 관계 유지', '현실적인 판단'],
    weaknesses: ['감정 표현 부족', '차갑게 보일 수 있음', '공감 부족으로 보일 수 있음'],
    goodMatches: ['ESFC', 'ESLC'],
    badMatches: ['ENFC', 'ENLC'],
  },
  {
    code: 'RSFC',
    emoji: '📊',
    title: '안정 지원형',
    summary: '조용히 오래 가는 연애형',
    traits: '절제 + 안정 + 수동 + 밀착',
    personality:
      '표현은 적지만 꾸준하고 안정적인 관계를 만든다. 겉으로 드러나는 감정보다 내면의 신뢰를 중요하게 생각한다.',
    datingStyle:
      '서서히 관계를 쌓아가며 오래 유지한다. 변화보다는 안정 선호.',
    strengths: ['꾸준함', '신뢰성 높음', '안정적인 관계'],
    weaknesses: ['표현 부족', '답답하게 보일 수 있음', '감정 전달 어려움'],
    goodMatches: ['ESLC', 'ENLC'],
    badMatches: ['ENFI', 'RSLI'],
  },
  {
    code: 'RNLC',
    emoji: '⚡',
    title: '통제 집착형',
    summary: '겉은 차분, 속은 불안한 타입',
    traits: '절제 + 불안 + 주도 + 밀착',
    personality:
      '감정 표현은 적지만, 내부적으로는 불안이 크게 작용한다. 관계를 통제하려는 성향이 있다.',
    datingStyle:
      '겉으로는 냉정하지만 실제로는 관계를 많이 신경 쓴다.',
    strengths: ['관계 집중력', '주도적인 행동', '끈기 있음'],
    weaknesses: ['집착으로 보일 수 있음', '감정 표현 부족', '긴장감 유발'],
    goodMatches: ['ESFC', 'RSFC'],
    badMatches: ['RSLI', 'ESFI'],
  },
  {
    code: 'RNFC',
    emoji: '🧊',
    title: '감정 억제형',
    summary: '속마음을 잘 드러내지 않는 타입',
    traits: '절제 + 불안 + 수동 + 밀착',
    personality:
      '감정을 숨기는 성향이 강하다. 불안감이 있어도 표현하지 않기 때문에 오해를 받기 쉽다.',
    datingStyle:
      '표현 없이 관계를 유지하려 한다. 상대가 답답함을 느낄 수 있다.',
    strengths: ['감정 통제력', '차분함', '안정성'],
    weaknesses: ['소통 부족', '오해 발생', '거리감 형성'],
    goodMatches: ['ESLC', 'ESFC'],
    badMatches: ['ENLC', 'ENFC'],
  },
  {
    code: 'RSLI',
    emoji: '🌬',
    title: '쿨 독립형',
    summary: '연애보다 내 삶이 중요한 타입',
    traits: '절제 + 안정 + 주도 + 자유',
    personality:
      '감정에 크게 흔들리지 않으며 독립성이 강하다. 연애를 삶의 일부로만 본다.',
    datingStyle:
      '간섭 없는 관계 선호. 개인 시간을 중요하게 생각한다.',
    strengths: ['자기주도성', '감정 안정', '쿨한 관계'],
    weaknesses: ['차갑게 보일 수 있음', '거리감 큼', '애정 부족으로 보일 수 있음'],
    goodMatches: ['ESLI', 'ESFI'],
    badMatches: ['ENLC', 'ENFC'],
  },
  {
    code: 'RSFI',
    emoji: '🧘',
    title: '평온 거리형',
    summary: '편안하고 부담 없는 관계 선호',
    traits: '절제 + 안정 + 수동 + 자유',
    personality:
      '갈등을 싫어하고 안정적인 거리를 유지하려 한다. 관계를 조용히 이어가는 타입이다.',
    datingStyle:
      '자극보다 안정. 감정 기복 없는 연애 선호.',
    strengths: ['편안함', '안정성', '갈등 적음'],
    weaknesses: ['재미 부족', '표현 부족', '관계 발전 느림'],
    goodMatches: ['ESLI', 'ENLI'],
    badMatches: ['ENLC', 'ESLC'],
  },
  {
    code: 'RNLI',
    emoji: '🎯',
    title: '전략 거리형',
    summary: '겉은 쿨, 속은 계산형',
    traits: '절제 + 불안 + 주도 + 자유',
    personality:
      '감정을 드러내지 않으면서 관계를 전략적으로 운영한다. 거리와 타이밍을 중요하게 생각한다.',
    datingStyle:
      '관계를 계산적으로 접근하며 주도권을 유지하려 한다.',
    strengths: ['판단력 좋음', '주도성 있음', '상황 대응력'],
    weaknesses: ['진정성 의심', '감정 전달 부족', '거리감 발생'],
    goodMatches: ['ESFI', 'RSFI'],
    badMatches: ['ENFC', 'ESFC'],
  },
  {
    code: 'RNFI',
    emoji: '🧩',
    title: '카멜레온형',
    summary: '상황에 따라 완전히 달라지는 타입',
    traits: '절제 + 불안 + 수동 + 자유',
    personality:
      '일관된 연애 패턴이 없다. 상대와 상황에 따라 행동과 감정 표현이 달라진다.',
    datingStyle:
      '관계마다 다른 모습을 보이며 예측이 어렵다.',
    strengths: ['적응력', '유연함', '다양한 매력'],
    weaknesses: ['일관성 부족', '신뢰 형성 어려움', '혼란 유발'],
    goodMatches: ['ESLC', 'ENLC'],
    badMatches: ['RSLI', 'RSFI'],
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
    const text = `내 연애 스타일은 ${result.code} ${result.title}! ${result.summary}`

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
            <span>
              {axisMetaList.find((item) => item.axis === currentQuestion.axis)?.label}
            </span>
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
    <main className="page-shell result-page">
      <section className="hero-card result-card-shell">
        <p className="eyebrow">Your Result</p>
        <h1>너의 연애 스타일은 이거다!</h1>

        <article className="result-highlight">
          <p className="result-emoji">{result.emoji}</p>
          <p className="result-code">{result.code}</p>
          <h2>{result.title}</h2>
          <p className="result-summary">{result.summary}</p>
          <p className="result-traits">{result.traits}</p>
        </article>

        <div className="result-detail-grid">
          <article className="detail-card">
            <h3>성격 설명</h3>
            <p>{result.personality}</p>
          </article>

          <article className="detail-card">
            <h3>연애 스타일</h3>
            <p>{result.datingStyle}</p>
          </article>

          <article className="detail-card">
            <h3>장점</h3>
            <ul>
              {result.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="detail-card">
            <h3>단점</h3>
            <ul>
              {result.weaknesses.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="detail-card">
            <h3>잘 맞는 타입</h3>
            <div className="chip-list">
              {result.goodMatches.map((item) => (
                <span key={item} className="match-chip good">
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="detail-card">
            <h3>안 맞는 타입</h3>
            <div className="chip-list">
              {result.badMatches.map((item) => (
                <span key={item} className="match-chip bad">
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>

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

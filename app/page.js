"use client"

import styles from "./page.module.css";
import { useEffect, useState} from 'react';
import Image from "next/image";

export default function Home() {
  const [questions, setQuestions] = useState([]); // Список вопросов
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Индекс текущего вопроса
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Выбранный ответ
  const [score, setScore] = useState(0); // Счётчик правильных ответов
  const [feedback, setFeedback] = useState(''); // Обратная связь пользователю
  const [quizFinished, setQuizFinished] = useState(false); // Статус завершения теста

  // Загружаем вопросы при загрузке компонента
  useEffect(() => {
    fetch('https://apifordistrictofkharkiv.onrender.com/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Error fetching questions:', err));
  }, []);

  // Обработка ответа пользователя
  const handleAnswerSubmit = async () => {
    const questionId = questions[currentQuestionIndex].id;

    const response = await fetch(`https://apifordistrictofkharkiv.onrender.com/question/${questionId}/${selectedAnswer}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: selectedAnswer }),
    });

    const result = await response.json();
    setFeedback(result.message);

    if (result.correct) {
      setScore(score + 1); // Увеличиваем счёт при правильном ответе
    }

    // Переход к следующему вопросу через 5 секунд
    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Следующий вопрос
        setSelectedAnswer(null); // Сбрасываем выбранный ответ
        setFeedback(''); // Сбрасываем обратную связь
      } else {
        setQuizFinished(true); // Тест завершён
      }
    }, 2000);
  };

  // Функция для отображения сообщения по результатам теста
  const getFinalMessage = () => {
    if (score >= 4) return 'Чудово! Ти знаєш свої права!';
    if (score >= 3) return 'Добре, але є куди зростати.';
    if (score >= 1) return 'Тобі варто ознайомитись із правами людини!';
    return 'Ти знаєш, що маєш рацію!';
  };

  // Если тест завершён, выводим результат
  if (quizFinished) {
    return (
      <div>
        <h1>Тест завершено!</h1>
        <p>Кількість правильних відповідей: {score} з {questions.length}</p>
        <h2>{getFinalMessage()}</h2>
      </div>
    );
  }

  // Если вопросы ещё загружаются
  if (questions.length === 0) return <p>Loading...</p>;

  // Отображение текущего вопроса
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.main}>
      <div className={styles.boxCentr}>
        <span className={styles.mainTitle}>"Я маю право..." – твій гід у світі прав і свобод!</span>
      </div>
      <div>
        <span className={styles.text}>
        У сучасному світі знання своїх прав — це ключ до свободи, захисту та успішного майбутнього. Проєкт "Я маю право..." створений для того, щоб допомогти кожному громадянину розуміти свої права, захищати їх і використовувати на практиці.
        
        Ми прагнемо до того, щоб суспільство стало правосвідомим, сильним і незалежним. Наші матеріали, інтерактивні інструменти та навчальні квізи допоможуть вам розібратися у складних юридичних питаннях, знайти відповіді на свої запитання та дізнатися, як діяти в різних життєвих ситуаціях.
        </span>
      </div>
      <div className={styles.informationBox}>
        <span className={styles.litleTitle}>Що ми пропонуємо?</span>
        <ul className={styles.ul}>
          <li className={styles.li}>Освітні статті: Простими словами про важливі аспекти прав людини.</li>
          <li className={styles.li}>Юридичні інструменти: Шаблони документів, поради щодо звернень до державних органів.</li>
          <li className={styles.li}>Гарячі лінії: Швидкий доступ до юридичної допомоги.</li>
          <li className={styles.li}>Квізи та тести: Дізнайтесь, наскільки добре ви знаєте свої права.</li>
        </ul>
      </div>
      <div className={styles.box}>
        <div className={styles.boxCentr}>
        <span className={styles.mainTitle}>Освітні статті: Простими словами про права людини</span>
        </div>
        <span>
          Що таке права людини?

          Права людини – це базові свободи, які належать кожній людині від народження. Вони захищають нашу гідність і дають можливість жити у справедливому суспільстві.
        </span>
        <div className={styles.conteinerForInformationBox}>
          <div className={styles.informationBox}>
            <span className={styles.litleTitle}>Основні права:</span>
            <ul className={styles.ul}>
              <li className={styles.li}>Право на життя – жодна людина не може бути позбавлена життя незаконно.</li>
              <li className={styles.li}>Право на освіту – кожен має можливість отримувати знання у школах та університетах.</li>
              <li className={styles.li}>Право на медичну допомогу – держава забезпечує безкоштовний доступ до екстреної медицини.</li>
              <li className={styles.li}>Захист від дискримінації – усі рівні перед законом, незалежно від статі, національності чи віку.</li>
            </ul>
          </div>
          <div className={styles.informationBox}>
            <span className={styles.litleTitle}>Права людини захищені такими документами:</span>
            <ul className={styles.ul}>
              <li className={styles.li}>Конституція України – основний закон, що закріплює права громадян.</li>
              <li className={styles.li}>Всеукраїнська декларація прав людини.</li>
              <li className={styles.li}>Європейська конвенція з прав людини.</li>
            </ul>
          </div>
          <div className={styles.boxCentr}>
            <Image 
                src="/3.png"
                width={200}
                height={200}
                alt=""/>
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.boxCentr}>
          <span className={styles.mainTitle}>Юридичні інструменти: Шаблони та поради</span>
        </div>
        <span className={styles.litleTitle}>Як захистити свої права?</span>
        <ol className={styles.ol}>
          <li className={styles.li}>Зверніться до органів влади: Наприклад, можна подати скаргу до місцевої адміністрації.</li>
          <li className={styles.li}>Скористайтеся юридичними сервісами: Безкоштовна правова допомога доступна для всіх громадян (контакти нижче).</li>
        </ol>
        <span className={styles.litleTitle}>Корисні шаблони документів:</span>
        <ul className={styles.ul}>
          <li className={styles.li}>Скарга на порушення прав у державному закладі.</li>
          <li className={styles.li}>Заява до суду про порушення трудових прав.</li>
          <li className={styles.li}>Запит на отримання публічної інформації.</li>
        </ul>
        <div className={styles.boxCentr}>
          <Image 
                src="/pngwing.com.png"
                width={200}
                height={200}
                alt=""/>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.boxCentr}>
          <span className={styles.mainTitle}>Гарячі лінії: Швидкий доступ до юридичної допомоги</span>
        </div>
        <span className={styles.litleTitle}>Контакти, які вам допоможуть:</span>
        <ul className={styles.ul}>
          <li className={styles.li}>Безоплатна правова допомога: 0-800-213-103 (цілодобово, безкоштовно).</li>
          <li className={styles.li}>Гаряча лінія омбудсмена: 0800-50-17-20.</li>
          <li className={styles.li}>Допомога для дітей та підлітків: 116-111 (гаряча лінія "Ла Страда").</li>
        </ul>
        <span className={styles.litleTitle}>На гарячих лініях ви отримаєте:</span>
        <ul className={styles.ul}>
          <li className={styles.li}>Консультацію з будь-якого правового питання.</li>
          <li className={styles.li}>Допомогу у складанні скарг та звернень.</li>
          <li className={styles.li}>Поради щодо захисту прав у суді чи державних органах.</li>
        </ul>
        <div className={styles.boxCentr}>
          <Image 
                src="/pngwing.com (1).png"
                width={200}
                height={200}
                alt=""/>
        </div>
      </div>
      <div className={styles.qiezBox}>
        <span className={styles.text}>Вопрос {currentQuestionIndex + 1} из {questions.length}</span>
        <div className={styles.qiezCounter}>
          <span className={styles.qiezTitle }>{currentQuestion.name}</span>
          <ol className={styles.ol}>
            {[currentQuestion.answer1, currentQuestion.answer2, currentQuestion.answer3, currentQuestion.answer4].map((answer, index) => (
              <li key={index} className={styles.li}>
                <label className={styles.label}>
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={answer}
                    checked={selectedAnswer === answer}
                    onChange={() => setSelectedAnswer(answer)}
                    className={styles.input}
                  />
                  {answer}
                </label>
              </li>
            ))}
          </ol>
          <button onClick={handleAnswerSubmit} disabled={!selectedAnswer} className={styles.button}>Ответить</button>
          {feedback && <p>{feedback}</p>}
        </div>
      </div>
    </div>
  );
}

/* eslint-disable no-unused-vars */
import { alphabet } from './containers/constant/CONSTANT';
import readXlsxFile from 'read-excel-file';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import moment from 'moment';
var Util = {
  createAnswers(list, ans) {
    let listAnswers = {};
    let answers = [];
    if (!list || !ans)
      return undefined;
    let lengthList = Object.keys(list).length;
    let index = 0;
    for (let i = 0; i < lengthList; i++) {
      if (list[alphabet[i]] && list[alphabet[i]].length > 0) {
        listAnswers[alphabet[index]] = list[alphabet[i]];
        index++;
      } else {
        ans = ans.filter(e => e !== alphabet[i]);
      }
    }
    ans.sort().forEach((e, i) => {
      if (listAnswers[e]) {
        answers.push(e);
      }
    })

    return {
      listAnswers: listAnswers,
      answers: answers
    };
  },

  checkSubmitQuestion(question) {
    if (!question.fieldQuestionId)
      return 'fieldQuestionId null!';
    if (!question.content || question.content.length === 0)
      return 'Content question null';
    if (question.level === undefined)
      return 'Level question null';
    if (!question.listAnswers || Object.keys(question.listAnswers).length === 0)
      return 'List of Answers null';
    if (!question.answers || question.answers.length === 0)
      return 'Answers null';

    return undefined;
  },

  checkCreateRandomQuestion(level, timeOpen, timeClose, timeLive) {
    if (!level)
      return 'Level not empty!';
    if (!timeOpen)
      return 'Time open null!';
    if (!timeClose)
      return 'Time close null';
    if (!timeLive)
      return 'Time live';
    let time_open = Date.parse(timeOpen);
    let time_close = Date.parse(timeClose);
    if (time_close - time_open <= 0)
      return 'Time close > time open?';
    if (time_close - time_open < timeLive * 1000)
      return 'time_close - time_open >= time_live?';

    return undefined;
  },

  checkEmpty(obj) {
    if (obj)
      return true;
    else
      return false;
  },

  convertTimeBySecond(seconds) {
    let h = seconds / 3600;
    let m = (seconds - h * 3600) / 60;
    let s = seconds - h * 3600 - m * 60;
    let str = '';
    if (h > 0)
      str += `${h} h - `;
    if (m > 0)
      str += `${m} m - `;
    if (s > 0)
      str += `${s} s - `;
    if (str.length > 2)
      str = str.substr(0, str.length - 2);
    return str;
  },

  resultExam(listQuestions) {
    let number = 0;
    let total = listQuestions.length;
    listQuestions.forEach((e, i) => {
      if (e.answerTest) {
        if (e.answerTest.length === e.answers.length) {
          let temp = 0;
          for (let index = 0; index < e.answerTest.length; index++) {
            // eslint-disable-next-line
            if (e.answers.find(a => a == e.answerTest[index]))
              temp++;
          }
          if (temp === e.answers.length)
            number++;
        }
      }
    });

    return `${number} / ${total}`;
  },

  downloadTemplate(data) {
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wopts = { bookType: 'xlsx', bookSST: false, type: 'array' };
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, 'File mẫu');
    const wbout = XLSX.write(workbook, wopts);
    saveAs(
      new Blob([wbout], { type: 'application/octet-stream' }),
      `Template_${moment().format('HH:mm:ss DD-MM-YYYY')}.xlsx`
    );
  },

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}

export default Util;
const fn = {
  /** 输入 日 月 年 ，然后返回当前日期和输入数据后的 "YYYY-MM-DD" 格式日期 */
  dateToDate(d = 0, m = 0, y = 0) {
    const
      now = new Date(),
      year = now.getFullYear(),
      month = now.getMonth() + 1,
      day = now.getDate(),
      nww = new Date(year + y, month + m, day + d),
      nwwyear = nww.getFullYear(),
      nwwmonth = nww.getMonth(),
      nwwday = nww.getDate();
    return {
      now: '' + year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day),
      new: '' + nwwyear + '-' + (nwwmonth <= 10 ? '0' + nwwmonth : nwwmonth) + '-' + (nwwday <= 10 ? '0' + nwwday : nwwday)
    }
  },

  /** 内部函数，返回时间的 年 月 日 星 期 时 分 秒 数组 */
  _date(date) {
    date = new Date(date);
    const a = '日一二三四五六'.split('');
    return [date.getFullYear(), date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1), date.getDate() > 9 ? date.getDate() : '0' + date.getDate(), '周' + a[date.getDay()], date.getHours() > 9 ? date.getHours() : '0' + date.getHours(), date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes(), date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()]
  },
  /** 此函数返回日期格式  xxxx-xx-xx */
  nyr(date, split = '-') {
    let time = this._date(date);
    time = time[0] + split + time[1] + split + time[2];
    return time;
  },
  /** 此函数返回日期格式  xxxx-xx-xx xx:xx */
  nyrsf(date, split = '-') {
    let time = this._date(date);
    time = time[0] + split + time[1] + split + time[2] + ' ' + time[4] + ":" + time[5];
    return time;
  },
  /** 此函数返回日期格式  xxxx-xx-xx xx:xx:xx */
  nyrsfm(date, split = '-') {
    let time = this._date(date);
    time = time[0] + split + time[1] + split + time[2] + ' ' + time[4] + ":" + time[5] + ":" + time[6];
    return time;
  },
  /** 根据毫秒数换算时间 */
  numberToTime(date) {
    let time = this._date(date);
    time = time[0] + split + time[1] + split + time[2] + ' ' + time[4] + ":" + time[5] + ":" + time[6];
    return time;
  },
  /** 返回聊天时间戳，返回格式类似于微信聊天
   * 同天只显示      时 分
   * 昨天显示        昨天 时 分
   * 七天内          周几 时 分
   * 本月            几号 时 分
   * 同年            月  日
   * 非同年          年  月  日
   */
  dialogueListShowTime(date, room = false) {
    if (typeof date != 'number') return date;
    for (let i = date.toString().length; i < 13; i++)
      date *= 10;
    let time = this._date(date);
    let now = this._date(new Date());
    if (now[0] != time[0])
      return `${time[0]}年${time[1]}月${time[2]}日${room == true ? ' ' + time[4] + ':' + time[5]:''}`;
    else if (now[1] != time[1])
      return `${time[1]}月${time[2]}日${room == true ? ' ' + time[4] + ':' + time[5]:''}`;
    else if (now[2] - time[2] == 1)
      return `昨天 ${room == true ? ' ' + time[4] + ':' + time[5]:''}`;
    else if (now[2] - time[2] < 8 && now[2] != time[2])
      return `${time[3]} ${room == true ? ' ' + time[4] + ':' + time[5]:''}`;
    else if (now[2] != time[2])
      return time[3] + time[4] + ' : ' + time[5];
    else
      return time[4] + ' : ' + time[5];
  }
};
export default fn;
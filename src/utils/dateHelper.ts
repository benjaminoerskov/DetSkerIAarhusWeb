class DateHelper {
  // 'DD / MM / YYYY - HH:mm'
  public static getDisplayString(d : Date) : string {
    return(this.formatAsTwoDigigtNumber(d.getDate()) + ' / ' + this.formatAsTwoDigigtNumber(d.getMonth() + 1) + ' / ' + d.getFullYear() + ' - ' + this.formatAsTwoDigigtNumber(d.getHours()) + ':' + this.formatAsTwoDigigtNumber(d.getMinutes()));
  }

  // 'YYYY-DD-MM'
  public static GetApiString(d : Date) : string {
    return(d.getFullYear() + '-' + this.formatAsTwoDigigtNumber(d.getMonth() + 1) + '-' + this.formatAsTwoDigigtNumber(d.getDate()));
  }

  public static formatAsTwoDigigtNumber(n : number) : string {
    return('0' + n).slice(-2);
  }
}

export default DateHelper;

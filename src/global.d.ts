type RecordItem = {
  time: any;
  tag: string;
  message: string;
  type: string;
  amount: string;
}

interface DatePicker {
  now: object;
  format: string;
  locale: object;
}

type TagObj =
  {
    name: string;
    icon: string;
  }

type DetailListObj = {
  time?: RecordItem[];
}

type TableData = { value: number; name: string }

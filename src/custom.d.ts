type RecordItem = {
  year: number | undefined;
  month: number | undefined;
  date: number | undefined;
  tag: string;
  message: string;
  type: string;
  amount: string;
}
type TagObj =
  { name: string;
    icon: string;
  }
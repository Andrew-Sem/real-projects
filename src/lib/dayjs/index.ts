import relativeTime from "dayjs/plugin/relativeTime";
import dayjsdefault from "dayjs";
import "dayjs/locale/ru";

dayjsdefault.extend(relativeTime);
dayjsdefault.locale("ru");

export const dayjs = dayjsdefault;

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formatDate(date: Date) {
  return format(date, 'dd MMM yyyy', { locale: ptBR });
}

export function formatDateTime(date: Date) {
  return format(date, "dd MMM yyyy, 'às' HH:mm", { locale: ptBR });
}

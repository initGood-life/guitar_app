/* eslint-disable @typescript-eslint/no-floating-promises */
import type { SweetAlertIcon } from 'sweetalert2';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface AlertProps {
  title: string;
  text?: string;
  icon?: SweetAlertIcon;
}

const MySwal = withReactContent(Swal);

const showSwal = ({ title, text, icon }: AlertProps) => {
  MySwal.fire({ title, text, icon });
};
export default showSwal;

declare module '@coreui/utils/src';

declare module '@coreui/chartjs/dist/js/coreui-chartjs.js';

declare module '*.json' {
  const value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  export default value;
}

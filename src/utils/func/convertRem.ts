
// set font-size theo html -> toan bo thay doi theo 
//  example html { font-size: 16px; } -> toan bo thay doi theo 16px

export const convertPixelToRem = (val: number) => {
  return val / 16 + 'rem';
};

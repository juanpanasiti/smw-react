export const COLORS = ['#FF6961', '#FFD1A4', '#FFFACD', '#77DD77', '#AEC6CF', '#D4A4E5', '#FFB6C1', '#AAF0D1', '#AFE4DE', '#FFDAB9'];
export const pickColor = (index: number) => {
    return COLORS[index % COLORS.length];
};

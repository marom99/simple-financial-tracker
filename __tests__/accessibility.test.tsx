import React from 'react';
import { render } from '@testing-library/react-native';
import { FloatingAddButton } from '../src/components/FloatingAddButton';
import { PeriodSummaryRow } from '../src/components/PeriodSummaryRow';

describe('accessibility', () => {
  it('exposes accessible labels for primary controls', () => {
    const { getByLabelText } = render(<FloatingAddButton onPress={jest.fn()} />);
    expect(getByLabelText('Add expense')).toBeTruthy();
  });

  it('describes period rows with amount context', () => {
    const { getByLabelText } = render(
      <PeriodSummaryRow
        amount={50000}
        comparisonLabel={null}
        label="Today"
        onPress={jest.fn()}
      />,
    );
    expect(getByLabelText('Today, Rp50.000 spent')).toBeTruthy();
  });
});

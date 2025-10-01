import { PlaceOrder } from 'useCases/PlaceOrder';

import { container } from 'di/container';

export function makePlaceOrder() {
  return new PlaceOrder(
    container,
  );
}

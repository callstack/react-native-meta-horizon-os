# Monetization

Meta Horizon Store offers several monetization options for non-game apps.

## Options

### One-Time Purchase

Users pay once to download your app:

- Simple pricing model
- No recurring revenue
- Good for utility apps

### Subscriptions

Recurring payments for ongoing access:

- Monthly or annual billing
- Ideal for SaaS-style apps
- Regular revenue stream

### Try Before You Buy (TBYB)

Unique Meta feature:

- Users test app for 15-30 minutes
- No trial implementation needed
- Encourages conversions

## In-App Purchases

For in-app purchases, use `expo-iap`:

### Installation

```bash
npm install expo-iap
```

### Setup

Follow the [expo-iap Horizon OS guide](https://hyochan.github.io/expo-iap/docs/getting-started/setup-horizon/).

### Example

```tsx
import * as IAP from 'expo-iap';

async function purchaseItem(productId) {
  try {
    await IAP.purchaseItemAsync(productId);
    // Handle successful purchase
  } catch (error) {
    // Handle error
  }
}
```

## Use Cases

### Premium Features

- Unlock advanced functionality
- Remove limitations
- Access premium content

### Subscriptions

- Regular content updates
- Cloud features
- Ad-free experience

### Customization

- Themes and skins
- Avatars
- Personalization options

## Pricing Tools

Meta provides advanced pricing features:

- **A/B testing**: Test different prices
- **Regional pricing**: Adjust by region
- **Sales**: Temporary price reductions
- **Bundles**: Package multiple items
- **Preorders**: Launch with preorders

See [Meta's monetization documentation](https://developers.meta.com/horizon/resources/monetization) for details.

## Best Practices

- **Clear value**: Make benefits obvious
- **Fair pricing**: Price appropriately for value
- **Test pricing**: Use A/B testing to optimize
- **Consider TBYB**: Leverage Try Before You Buy

## Resources

- [expo-iap Documentation](https://hyochan.github.io/expo-iap/)
- [Meta Monetization Guide](https://developers.meta.com/horizon/resources/monetization)
- [Meta IAP SDK](https://developers.meta.com/horizon/documentation/native/ps-monetization-overview/)

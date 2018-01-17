## FX Exchanger Widget
USD, EUR, GBP exchanger

### Add widget to your project
```
package.json
{
    ...
    dependencies: {
        ...
        "exchanger": "shtabnoy/exchanger"
    }
}
```
```
import ExchangeWidget from 'exchanger'

class App extends Component {
    render() {
        return (
            <ExchangeWidget />
            ...
        )
    }
}
```

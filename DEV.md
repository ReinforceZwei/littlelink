## Regex to extract brand data

```regex
<!-- (?<name>.+?) -->\n.+<a.+?class="button (?<class>.+?)".*<img.*src="(?<icon>.+?)".+?>(?<desc>.+?)<\/a>
```

Use regex101.com to process the `index.html`, then export captured groups in json format.

## Script to normalize the exported data

```py
import json
import sys

input_data = sys.argv[1] if len(sys.argv) > 1 else 'data-raw.json'
output_file = sys.argv[2] if len(sys.argv) > 2 else 'data.json'

file = open(input_data)
parsed = json.loads(file.read())
file.close()

result = []
for match in parsed:
    name = None
    css_class = None
    icon = None
    desc = None
    for group in match:
        if group['groupName'] == 'name':
            name = group['content']
        elif group['groupName'] == 'class':
            css_class = group['content']
        elif group['groupName'] == 'icon':
            icon = group['content']
        elif group['groupName'] == 'desc':
            desc = group['content']
    if name and css_class and icon and desc:
        result.append({
            'name': name,
            'class': css_class,
            'icon': icon,
            'desc': desc
        })

result_file = open(output_file, 'w')
result_file.write(json.dumps(result, ensure_ascii=False))
result_file.close()
```
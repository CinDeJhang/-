"""Create a static game site containing only the browser runtime files."""
from pathlib import Path
import re
import shutil

root = Path(__file__).resolve().parents[1]
output = root / '_site'
output.mkdir(exist_ok=True)
files = [root / 'index.html', root / 'style.css', root / 'game.js']
files += sorted(root.glob('*.mjs'))
for source in files:
    if source.suffix in {'.js', '.mjs'}:
        for dependency in re.findall(r"from\s+['\"](\./[^'\"]+)['\"]", source.read_text()):
            if (source.parent / dependency).resolve() not in files:
                raise RuntimeError(f'Missing runtime dependency: {dependency}')
for destination in [output, output / 'tcvsinfo']:
    destination.mkdir(exist_ok=True)
    for previous in destination.iterdir():
        if previous.is_file():
            previous.unlink()
    for source in files:
        shutil.copy2(source, destination / source.name)
(output / '.nojekyll').touch()
print(f'Public game ready at / and /tcvsinfo/: {output} ({len(files)} runtime files per route)')

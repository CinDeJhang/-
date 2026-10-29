"""Generate the dependency-free downloadable game from the current source."""
from pathlib import Path
root = Path(__file__).resolve().parents[1]
html = (root / 'index.html').read_text()
html = html.replace('<link rel="stylesheet" href="style.css">', '<style>' + (root / 'style.css').read_text() + '</style>')
parts = []
for name in ['course-intro.mjs', 'world.mjs', 'c-practice.mjs', 'lesson.mjs', 'arduino-practice.mjs', 'arduino-lesson.mjs', 'weather.mjs', 'mission-progress.mjs', 'logic-practice.mjs', 'logic-lesson.mjs', 'hardware-practice.mjs', 'hardware-lesson.mjs', 'circuits-practice.mjs', 'breadboard-guide.mjs', 'circuits-lesson.mjs', 'opa-practice.mjs', 'opa-lesson.mjs', 'office-intro.mjs', 'training-intro.mjs', 'game.js']:
    source = (root / name).read_text()
    source = '\n'.join(line for line in source.splitlines() if not line.startswith('import '))
    source = source.replace('export ', '')
    # Each module keeps its lexical scope; only the explicit public names cross scopes.
    exports = {'course-intro.mjs': 'addCourseIntro', 'world.mjs': 'floors,validName,roomPosition,floorY,avatar,directorGreeting', 'c-practice.mjs': 'checkProgram,HELLO_PROGRAM', 'lesson.mjs': 'openProgrammingLesson,programmingLessonOpen', 'arduino-practice.mjs': 'LED_PROGRAM,checkLedMission', 'arduino-lesson.mjs': 'openArduinoLesson,arduinoLessonOpen', 'weather.mjs': 'startCampusWeather', 'mission-progress.mjs': 'missionRooms,normalizeCompletions,completeMission,allMissionsComplete', 'logic-practice.mjs': 'logicGates,gateOutput,truthRows,initialLogicInputs,normalizeLogicInputs,checkLogicMission', 'logic-lesson.mjs': 'openLogicLesson,logicLessonOpen', 'hardware-practice.mjs': 'hardwareParts,hardwareSlots,emptyMotherboard,normalizeMotherboard,installHardware,checkHardwareMission', 'hardware-lesson.mjs': 'openHardwareLesson,hardwareLessonOpen', 'circuits-practice.mjs': 'fixedCircuits,normalizeCircuitAnswers,checkCircuitsMission,breadboardCircuit', 'breadboard-guide.mjs': 'breadboardTopics,breadboardGuideSvg', 'circuits-lesson.mjs': 'openCircuitsLesson,circuitsLessonOpen', 'opa-practice.mjs': 'OPA_CONFIG,opaState,opaSample,checkOpaMission,normalizeOpaResistance', 'opa-lesson.mjs': 'openOpaLesson,opaLessonOpen', 'office-intro.mjs': 'openOfficeIntroduction,officeIntroductionOpen', 'training-intro.mjs': 'openTrainingIntroduction,trainingIntroductionOpen'}.get(name)
    if exports:
        source = 'const {' + exports + '} = (() => {\n' + source + '\nreturn {' + exports + '};\n})();'
    parts.append(source)
script = '\n'.join(parts).replace('</script', '<\\/script')
html = html.replace('<script type="module" src="game.js"></script>', '<script type="module">' + script + '</script>')
output = root.parent / '資訊館漫遊.html'
output.write_text(html)
print(output)

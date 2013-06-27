
# jQ Marquee

There are a lot of wonderful marquee plugins out there, but this one:

- Cycles through a `<ul>` with jQuery fade
- Expands like an accordion on mousenter
- Resumes on mouseleave


Extracted from [China.AidData.org](http://china.aiddata.org), bare-bones [jsFiddle](http://jsfiddle.net/RSwwk/2/).

## Usage

1. Include the plugin after jQuery:

```HTML
	<script src='jquery.js'></script>
	<script src='jq_marquee.js'></script>
```



2. Create a `<ul>` element with some `<li>` children:

```HTML
		<ul id='marquee_1' class='marquee'>
			<li>Never gonna give you up, </li>
			<li>Never gonna let you down, </li>
			<li>Never gonna run around and desert you. </li>
			<li>Never gonna make you cry, </li>
			<li>Never gonna say goodbye, </li>
			<li>Never gonna tell a lie and hurt you.</li>
		</ul>
```

3. Call `.marquee()` on a `<ul>` jQuery object:

```javascript
	$('#marquee_1').marquee()
```

## Options

The `.marquee()` method takes an optional _options_ object, which may have the following attributes:

```javascript
	options = {
		target: "#custom_container",   // a css selector (string)
		period: 4000,                  // number of milliseconds to show each item
		phase:  1000,                  // number of milisections to between items and during slide up/down
	}
```

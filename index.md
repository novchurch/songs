---
layout: default
---

{% if site.show_excerpts %}
  {% include home.html %}
{% else %}
  {% include archive.html title="Список песен" %}
{% endif %}

{% include header.html %}

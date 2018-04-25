module ApplicationHelper

  def nav_link(text, path, options={})
    clazz = "nav-item lead font-weight-bold #{options.delete(:class)}"
    if current_page?(path)
      clazz += " active"
      text = text + " <span class='sr-only'>(current)</span>"
    end

    content_tag(:li, {class: clazz}.merge(options)) do
      link_to raw(text), path, class: 'nav-link'
    end
  end



end

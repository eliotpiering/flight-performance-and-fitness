module ApplicationHelper

  def nav_link(text, path)
    options = {class: 'nav-item lead font-weight-bold'}
    if current_page?(path)
      options[:class] = options[:class] + " active"
      text = text + " <span class='sr-only'>(current)</span>"
    end

    content_tag(:li, options) do
      link_to raw(text), path, class: 'nav-link'
    end
  end



end

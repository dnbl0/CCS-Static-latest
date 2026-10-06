module SearchHistoryHelper
  # "Today", "Yesterday", "2 days ago" ... for the search history's day headings (CCS-143, CCS-206).
  def history_day_label(date, today: Time.zone.today)
    days = (today - date).to_i
    return "Today" if days <= 0
    return "Yesterday" if days == 1

    "#{days} days ago"
  end
end
